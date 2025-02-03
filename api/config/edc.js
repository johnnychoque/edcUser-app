/*
1) url.transfer: getTransferUrl():

  - Aquí, getTransferUrl() se ejecuta inmediatamente cuando se define el objeto.
  - El resultado de esta función (una cadena de texto con la URL completa) se asigna a url.transfer.
  - Esto significa que url.transfer será una cadena de texto fija, calculada una sola vez cuando se importa el módulo.
  - Uso: edc.url.transfer directamente te dará la URL completa.

2) url.agreement: getAgreementUrl:

  - Aquí, se asigna la función getAgreementUrl directamente, sin ejecutarla.
  - url.agreement será una función que se puede llamar más tarde con un parámetro.
  - Esto permite generar URLs dinámicas basadas en el parámetro negotiationId que se pase.
  - Uso: edc.url.agreement(someNegotiationId) te dará la URL completa.

*/

import config from 'config'

const getControlUrl = () => {
  const host = config.get('provider.host')
  const port = config.get('provider.port.control')
  return `${host}:${port}/control/transfer`
}

const getPublicUrl = () => {
  const host = config.get('provider.host')
  const port = config.get('provider.port.public')
  return `${host}:${port}/public/`
}

const getAssetUrl = () => {
  const host = config.get('provider.host')
  const port = config.get('provider.port.management')
  return `${host}:${port}/management/v3/assets`
}

const getPolicyUrl = () => {
  const host = config.get('provider.host')
  const port = config.get('provider.port.management')
  return `${host}:${port}/management/v3/policydefinitions`
}

const getContractUrl = () => {
  const host = config.get('provider.host')
  const port = config.get('provider.port.management')
  return `${host}:${port}/management/v3/contractdefinitions`
}

const getCatalogUrl = () => {
  const host = config.get('consumer.host')
  const port = config.get('consumer.port.management')
  return `${host}:${port}/management/v3/catalog/request`
}

const getNegotiationUrl = () => {
  const host = config.get('consumer.host')
  const port = config.get('consumer.port.management')
  return `${host}:${port}/management/v3/contractnegotiations`
}

const getAgreementUrl = (contractNegotiationId) => {
  const host = config.get('consumer.host')
  const port = config.get('consumer.port.management')
  return `${host}:${port}/management/v3/contractnegotiations/${contractNegotiationId}`
}

const getTransferUrl = () => {
  const host = config.get('consumer.host')
  const port = config.get('consumer.port.management')
  return `${host}:${port}/management/v3/transferprocesses`
}

const getStatusUrl = (transferProcessId) => {
  const host = config.get('consumer.host')
  const port = config.get('consumer.port.management')
  return `${host}:${port}/management/v3/transferprocesses/${transferProcessId}`
}

const getEdrUrl = (transferProcessId) => {
  const host = config.get('consumer.host')
  const port = config.get('consumer.port.management')
  return `${host}:${port}/management/v3/edrs/${transferProcessId}/dataaddress`
}

const getPullUrl = () => {
  const host = config.get('provider.host')
  const port = config.get('provider.port.public')
  return `${host}:${port}/public`
}

export default {
  url: {
    control: getControlUrl(),
    public: getPublicUrl(),
    asset: getAssetUrl(),
    policy: getPolicyUrl(),
    contract: getContractUrl(),
    catalog: getCatalogUrl(),
    negotiation: getNegotiationUrl(),
    agreement: getAgreementUrl,
    transfer: getTransferUrl(),
    status: getStatusUrl,
    edr: getEdrUrl,
    pull: getPullUrl()
  },
  body: {
    asset: (baeProd) => ({
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@id": baeProd.id,
      "properties": {
        "name": baeProd.description,
        "contenttype": baeProd.contenttype
      },
        "dataAddress": {
        "type": "HttpData",
        "name": baeProd.name,
        "baseUrl": baeProd.provDataUrl,
        "proxyPath": "true"
      }
    }),
    policy: {
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/",
        "odrl": "http://www.w3.org/ns/odrl/2/"
      },
      "@id": "aPolicy",
      "policy": {
        "@context": "http://www.w3.org/ns/odrl.jsonld",
        "@type": "Set",
        "permission": [],
        "prohibition": [],
        "obligation": []
      }
    },
    contract: {
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@id": "1",
      "accessPolicyId": "aPolicy",
      "contractPolicyId": "aPolicy",
      "assetsSelector": []
    },
    catalog: {
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "counterPartyAddress": `${config.get('provider.host')}:${config.get('provider.port.protocol')}/protocol`,
      "protocol": "dataspace-protocol-http"
    },
    negotiation: (contractOfferId) => ({
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@type": "ContractRequest",
      "counterPartyAddress": `${config.get('provider.host')}:${config.get('provider.port.protocol')}/protocol`,
      "protocol": "dataspace-protocol-http",
      "policy": {
        "@context": "http://www.w3.org/ns/odrl.jsonld",
        "@id": contractOfferId,
        "@type": "Offer",
        "assigner": "provider",
        "target": "assetId"
      }
    }),
    transfer: (contractAgreementId) => ({
      "@context": {
        "@vocab": "https://w3id.org/edc/v0.0.1/ns/"
      },
      "@type": "TransferRequestDto",
      "connectorId": "provider",
      "counterPartyAddress": `${config.get('provider.host')}:${config.get('provider.port.protocol')}/protocol`,
      "contractId": contractAgreementId,
      "protocol": "dataspace-protocol-http",
      "transferType": "HttpData-PULL"
    })
  }
}