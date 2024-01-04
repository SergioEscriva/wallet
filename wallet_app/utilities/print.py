#!/usr/bin/python
# -*- coding: utf-8 -*-
from utilities.transaction import Transaction


class Print():
    def __init__(self):
        pass
    
    def printSolutions(self,wallet_id,solution_all):
        #soluciones_all = Settle().divisionWallet(wallet_id)
        solutions = solution_all[0]
        debts = solution_all[1]
        all_amounts = Transaction().amountTotal(wallet_id)
        all_amounts = all_amounts["amount"]
        payments_all = solution_all[2]
        payments_all = list(payments_all.items())

        # Imprimimos las soluciones 
        members_all = list(debts.items())
        payments = "<div id='resumen_pago'><div><center><b>Resumen de Pagos</b></div>"
        members = "" 
        for x in range((len(members_all))):
            member = members_all[x][0]
            pay = payments_all[x][1]
            settle = members_all[x][1]
            members+= " · " + member 
            
            if settle <= 0:
                difference_text = "<b>DEBE "
                difference_num = str(round(abs(settle),2))
                
            else:
                difference_text = "<b>LE DEBEN "
                difference_num = str(round(abs(settle),2))
  
            payment = "<div><b>" + member + ":</b> ha pagado " + str(round(abs(pay), 2)) + "€, <br>" +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; -> debía pagar " + str(round(abs(pay - settle), 2)) + "€ - "+ difference_text + difference_num + "€<hr/></b></div>"
            
            
            payments+= payment
            
        shares = '<div id="resumen_deuda"><div><center><b><u>Resumen de Deudas</u></b></b></div>'
        
        for payer, receiver, amount_pay in solutions:
          
            share = "<div><p><center><b>· " + payer + "</b> paga a " + receiver +" "+ str(round(amount_pay, 2)) + "€</center></p></div>"
            shares+= share
        
        total = "<p><font size='15px'><b>Gasto Total " + str(round(all_amounts, 2)) +"€ </b></div><div><b>Miembros:</b> " + members +"<br></p>"
        '''
        final = []
        final.append(total)
        final.append(payments)
        final.append(shares)
        '''
        final = ""
        final += total + "<br>"
        final += shares +  "</div><br>"
        final += payments + "<div><br>"
        
        return final

