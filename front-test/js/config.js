/**
 * @name : Orinoco
 * @create : 20/08/2020
 * @version : 1.0.0 ALPHA
 * @author : Killian Lairet
 */




/**
 * Stock dans le localStorage l'Url de l'API choisit
 */
const URL_CAMERAS = 'http://localhost:3000/api/cameras/';
const URL_TEDDIES = 'http://localhost:3000/api/teddies/';
const URL_FURNITURE = 'http://localhost:3000/api/furniture/';
localStorage.setItem('baseURL', URL_CAMERAS);
