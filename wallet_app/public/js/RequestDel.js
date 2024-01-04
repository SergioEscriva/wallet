import { UrlPath } from './UrlPath.js'

export class RequestDel {


    //DEL
    static async delWallet(wallet_id) {
        const url = UrlPath.URL.WALLET + wallet_id
        const member_add =  {
            method: 'DELETE',
            body: JSON.stringify({wallet_id}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestDel._delRequest(url, member_add)
    }

    static async delTransac(Id) {
        const url = UrlPath.URL.TRANSACTIONE + Id
        const delete_transac =  {
            method: 'DELETE',
            body: JSON.stringify({Id}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestDel._delRequest(url, delete_transac)
    }

    static async delCategory(category) {
        const url = UrlPath.URL.CATEGORIES + category
        const category_del =  {
            method: 'DELETE',
            body: JSON.stringify(category),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestDel._delRequest(url, category_del)
    }

    static async delMember(wallet_id,member_name) {
        const url = UrlPath.URL.WALLET + wallet_id + "/member/" + member_name
        const member_add =  {
            method: 'DELETE',
            body: JSON.stringify({wallet_id,member_name}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestDel._delRequest(url, member_add)
    }

    static async delUser(user_id) {
        const url = UrlPath.URL.USER + user_id
        const delete_user =  {
            method: 'DELETE',
            body: JSON.stringify({user_id}),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }
        return await RequestDel._delRequest(url, delete_user)
    }



    //REQUEST

    static async _delRequest(url, data) {
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