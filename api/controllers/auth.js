import axios from 'axios'
import config from 'config'

export class AuthController {
  static async handleCallback (req, res) {
    console.log('Usando handleCallback');
    try {
      const params = {
          access_token: req.user.accessToken
        };
      const idm_url = config.get('idm.url');
      const response = await axios.get(`${idm_url}/user`, { params });
      if (response.status == 200) {
        console.log(response.data);
        const { id, username, email } = response.data;
        const userData = { id, username, email };
        const encodedData = encodeURIComponent(JSON.stringify(userData));
        const web_url = config.get('web.url');
        res.redirect(`${web_url}/user?data=${encodedData}`);
      } else {
        console.log('Error Upload Asset', response.status);
      } 
    } catch (error) {
      next(error);
    }
  }

    static getProfile (req, res) {
        if (!req.isAuthenticated()) {
            return res.redirect('/');
        }
        res.json(req.user);
    }

    static logout (req, res, next) {
        req.logout((err) => {
            if (err) {
            return next(err);
            }
            res.redirect('/');
        });
    }
}

