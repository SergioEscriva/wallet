import { UrlPath } from './UrlPath.js'

export class RequestPut {

    //PUT
    static async putProprietary(wallet_id,proprietary) {
        const url = UrlPath.URL.WALLET + wallet_id + "/proprietary/" + proprietary
        const proprietary_update =  {
            method: 'PUT',
            body: JSON.stringify(wallet_id,proprietary),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, proprietary_update)
    }

    static async putWallet(wallet_name,name_new) {
        const url = UrlPath.URL.WALLET + wallet_name +"/"+ name_new
        const wallet_put =  {
            method: 'PUT',
            body: JSON.stringify({wallet_name,name_new}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, wallet_put)
    }

    static async editTransaction(transaction) {
        const url = UrlPath.URL.TRANSACTIONE
        const transaction_add =  {
            method: 'PUT',
            body: JSON.stringify(transaction),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, transaction_add)
    }

    static async editCategory(category_old,category_new) {
        const url = UrlPath.URL.CATEGORIES + category_old +"/"+ category_new 
        const category_edit =  {
            method: 'PUT',
            body: JSON.stringify(category_old,category_new),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, category_edit)
    }

    static async putNickname(member_name,name_new) {
        const url = UrlPath.URL.USER + "nickname/" + member_name +"/"+ name_new
        const member_put =  {
            method: 'PUT',
            body: JSON.stringify({member_name,name_new}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, member_put)
    }

    static async putUser(member_name,name_new) {
        const url = UrlPath.URL.USER + member_name +"/"+ name_new
        const member_put =  {
            method: 'PUT',
            body: JSON.stringify({member_name,name_new}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, member_put)
    }

    static async putPin(pin_old,pin_new,user_id) {
        const url = UrlPath.URL.USER + "pin/" + pin_old +"/"+ pin_new +"/"+ user_id
        const pin_put =  {
            method: 'PUT',
            body: JSON.stringify({pin_old,pin_new,user_id}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, pin_put)
    }

    
    static async shareWallet(share, wallet_id) {
        const url = UrlPath.URL.WALLET + "share/" + wallet_id + "/"+ share
        const share_put =  {
            method: 'PUT',
            body: JSON.stringify({wallet_id, share}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, share_put)
    }
   
    static async addDescription(wallet_id,description) {
        const url = UrlPath.URL.WALLET + "description/" + wallet_id + "/"+ description
        const description_put =  {
            method: 'PUT',
            body: JSON.stringify({wallet_id, description}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestPut._putRequest(url, description_put)
    }

    //REQUEST

    static async _putRequest(url, data) {
        try {
            const response = await fetch(url, data)
            const jsonMessage = await response.json()
            return jsonMessage
        } catch (error) {
            console.log(error)
            return null
        }
       
    }

}