/*
PROJETO: Planilha de Testes.
AUTOR: RAFAEL KOZLOWSKI ANDREOLA
PLANILHA BASE: Planilha.
NOME NO BANCO DE DADOS: Planilha de Teste.
BANCO DE DADOS: APPS-SCRIPT-FIREBASE.
TECNOLOGIAS UTILIZADAS: JAVASCRIPT/NODE.JS, TYPESCRIPT, NPM, GOOGLE API's, FIREBASE/FIRESTORE, CLOUD, GIT/GITHUB.
DESCRIÇÃO: 

Comandos:   'npm install firebase'      / 'npm install -g firebase-tools'   / 'firebase login'  / 'firebase init'
            'npm install googleapis'    / 'npm install @googleapis/docs' / '';
Compilar: ''
*/

import * as functions from "firebase-functions"
import { google } from 'googleapis'
import { initializeApp } from 'firebase-admin/app'
import { getFirestore } from "firebase-admin/firestore"

const serviceAccount = require('../apps-script-firebase.json')
const sheets = google.sheets('v4')

initializeApp()

const firestore = getFirestore()

exports.planilhaTeste = functions.https.onRequest(async (request, response) => {

    const jwtClient = new google.auth.JWT({
        email: serviceAccount.client_email,
        key: serviceAccount.private_key,
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })

    await jwtClient.authorize()

    const { data } = await sheets.spreadsheets.values.get({
        auth: jwtClient,
        spreadsheetId: '1rDz_RkD88izFDL1O1_Z7NRBeFvvYcLB-eo_Zd9V6eNk',
        range: `Planilha!A2:D5`
    })

    data.values?.forEach(row => {
        const [id, nome, situacao, credencial, valor, valorAlterado, status, dataDia, dataMes, dataAno] = row
        firestore.collection("Planilha de Teste").doc(id).set({
            id, nome, situacao, credencial, valor, valorAlterado, status, dataDia, dataMes, dataAno
        })
    })
})
