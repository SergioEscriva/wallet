export class UrlPath {
    static baseUrl(){
        return 'http://127.0.0.1:8000/'
    }
    // return 'http://serjav.mooo.com:8000/'
    static URL = {
        WALLET: UrlPath.baseUrl() + 'wallet/',
        USER: UrlPath.baseUrl() + 'user/',
        TRANSACTIONS: UrlPath.baseUrl() + 'transactions/',
        BALANCE: UrlPath.baseUrl() + 'transaction/balance/',
        BALANCE_MIN: UrlPath.baseUrl() + 'transaction/balance_min/',
        DIVISION: UrlPath.baseUrl() + 'settle/',
        MEMBERS: UrlPath.baseUrl() + 'wallet/members/',
        CATEGORIES: UrlPath.baseUrl() + 'categories/',
        TRANSACTIONE: UrlPath.baseUrl() + 'transaction/',
        FILE: UrlPath.baseUrl() + 'file',
        
    }
}