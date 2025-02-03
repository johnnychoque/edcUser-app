import config from 'config'

const assetTypesUrl = () => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/charging/api/assetManagement/assetTypes`
}

const getAssetListUrl = () => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/charging/api/assetManagement/assets`
}

const getAssetUrl = () => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/charging/api/assetManagement/assets/uploadJob/`
}

const getProductUrl = () => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/DSProductCatalog/api/catalogManagement/v2/productSpecification`
}

const getOfferUrl = (catId) => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/DSProductCatalog/api/catalogManagement/v2/catalog/${catId}/productOffering`
}

const getCatalogUrl = () => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/DSProductCatalog/api/catalogManagement/v2/catalog`
}

const getBillingUrl = () => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/DSBillingManagement/api/billingManagement/v2/billingAccount`
}

const getOrderUrl = () => {
  const host = config.get('bae.host')
  const port = config.get('bae.port')
  return `${host}:${port}/DSProductOrdering/api/productOrdering/v2/productOrder`
}

const getOfferBody = (param) => {
  return {
       "category":[
      {
         "id":"1",
         "href":"http://bae.docker:8004/DSProductCatalog/api/catalogManagement/v2/category/1"
      }
   ],
   "description":param.offerDesc,
   "isBundle":false,
   "lifecycleStatus":"Launched",
   "name":param.offerName,
   "version":"0.1",
   "serviceCandidate":{
      "id":"defaultRevenue",
      "name":"Revenue Sharing Service"
   },
   "productSpecification":{
      "id":param.productId,
      "href":`http://bae.docker:8004/DSProductCatalog/api/catalogManagement/v2/productSpecification/${param.productId}`
   },
   "productOfferingTerm":[
      {
         "name":"",
         "description":"",
         "type":"None",
         "isFullCustom":false,
         "exclusivity":"",
         "sector":"",
         "region":"",
         "purpose":"",
         "transferability":"",
         "validFor":{
            
         }
      }
   ]
  }
}

const getProductBody = (asset) => {
  return {
    "version":"0.1",
    "lifecycleStatus":"Launched",
    "isBundle":false,
    "name":asset.productName,
    "brand":"Santander",
    "productSpecCharacteristic":[
      {
        "name":"Asset type",
        "description":"Type of the digital asset described in this product specification",
        "valueType":"string",
        "configurable":false,
        "productSpecCharacteristicValue":[
          {
            "default":true,
            "unitOfMeasure":"",
            "value":asset.assetType,
            "valueFrom":"",
            "valueTo":""
          }
        ]
      },
      {
        "name":"Media type",
        "description":"Media type of the digital asset described in this product specification",
        "valueType":"string",
        "configurable":false,
        "productSpecCharacteristicValue":[
          {
            "default":true,
            "unitOfMeasure":"",
            "value": asset.contentType,
            "valueFrom":"",
            "valueTo":""
          }
        ]
      },
      {
        "name":"Location",
        "description":"URL pointing to the digital asset described in this product specification",
        "valueType":"string",
        "configurable":false,
        "productSpecCharacteristicValue":[
          {
            "default":true,
            "unitOfMeasure":"",
            "value": asset.content,
            "valueFrom":"",
            "valueTo":""
          }
        ]
      },
      {
        "name":"Asset",
        "description":"ID of the asset being offered as registered in the BAE",
        "valueType":"string",
        "configurable":false,
        "productSpecCharacteristicValue":[
          {
            "default":true,
            "unitOfMeasure":"",
            "value": asset.assetId,
            "valueFrom":"",
            "valueTo":""
          }
        ]
      }
    ],
    "attachment":[
      {
        "type":"Picture"
      }
    ],
    "relatedParty":[
      {
        "id":asset.ownerId,
        "href":`http://bae.docker:8004/DSPartyManagement/api/partyManagement/v2/individual/${asset.ownerId}`,
        "role":"Owner"
      }
    ]
  }
}

const getAssetBody = () => {
  return {
    "resourceType":"Basic Service",
    "content":"http://www.smartsantander.net/pereda-PRUEBA-3",
    "contentType":"json-ld"
  }
}

const getOrderBody = (param) => {
  return {
    "state":"Acknowledged",
    "priority":"4",
    "notificationContact":param.userEmail,
    "orderItem":[
       {
          "id":"0",
          "action":"add",
          "state":"Acknowledged",
          "productOffering":{
             "id":param.offerId,
             "href":`http://bae.docker:8004/DSProductCatalog/api/catalogManagement/v2/catalog/${param.catId}/productOffering/${param.offerId}`
          },
          "product":{
             "productCharacteristic":[
                {
                   "name":"Asset type",
                   "value":param.assetType
                },
                {
                   "name":"Media type",
                   "value":param.contentType
                },
                {
                   "name":"Location",
                   "value":param.content
                },
                {
                   "name":"Asset",
                   "value":param.assetId
                }
             ]
          },
          "billingAccount":[
             {
                "id":param.billId,
                "href":`http://bae.docker:8004/DSBillingManagement/api/billingManagement/v2/billingAccount/${param.billId}`
             }
          ]
       }
    ],
    "relatedParty":[
      {
        "id":param.userId,
        "href":`http://bae.docker:8004/DSPartyManagement/api/partyManagement/v2/individual/${param.userId}`,
        "role":"Customer"
      }
    ]
  }
}

export default {
  url: {
    assetTypes: assetTypesUrl(),
    assetList: getAssetListUrl(),
    asset: getAssetUrl(),
    product: getProductUrl(),
    catalog: getCatalogUrl(),
    billing: getBillingUrl(),
    order: getOrderUrl()
  },
  getAssetBody,
  getProductBody,
  getOfferBody,
  getOfferUrl,
  getOrderBody
}
