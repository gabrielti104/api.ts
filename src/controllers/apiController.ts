import{Request,Response} from 'express'

import {Phrase} from '../models/Phrase'

export const ping = (req:Request, res:Response) =>{
    res.json({pong:true})
}

export const random = (req:Request, res:Response) =>{
    let nRand:number = Math.floor(Math.random() * 10)

    res.json({number:nRand})
}

export const nome = (req:Request,res:Response) =>{
    let nome: string = req.params.nome
    
    res.json({nome:`Você enviou o nome: ${nome}`})
}

export const createPhrase = async (req:Request,res:Response) =>{
    let {autor, txt} = req.body

    let newFrase = await Phrase.create({autor,txt})

    res.json({id: newFrase.id, autor, txt})

}

export const listPhrases = async (req:Request, res:Response) =>{
    let list = await Phrase.findAll()
    res.json({list})
}

export const getPhrase =async (req:Request, res:Response) => {
    let {id} = req.params

    let frase = await Phrase.findByPk(id)

    if(frase){
        res.json({frase})
    }else{
        res.json({error:'Frase Não existe!'})
    }
}

export const updatePhrase =async (req:Request, res:Response) => {
    let {id} = req.params
    let {author, txt} = req.body

    let phrase = await Phrase.findByPk(id)

    if(phrase) {
        phrase.author = author
        phrase.txt = txt
        
        await phrase.save()

        res.json({phrase})
    }else{
        res.json({error: 'Frase não encontrada'})
    }
}

export const deletaPhrase =async (req:Request, res:Response) => {
    let {id} = req.params
    await Phrase.destroy({
        where:{
            id:req.params.id
        }
    })

    res.json({})
}