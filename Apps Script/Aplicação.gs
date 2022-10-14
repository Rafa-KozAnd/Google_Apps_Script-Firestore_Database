function startSync() {
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetname = "Importação";
  var sheet = ss.getSheetByName(sheetname);

  var sheetLR = sheet.getLastRow();
  var sheetLC = sheet.getLastColumn();
  var dataSR = 2;

  var sourceRange = sheet.getRange(2,1,sheetLR-dataSR+1,sheetLC);

  var sourceData = sourceRange.getValues();
  var sourceLen = sourceData.length;

  // Looping
   for (var i = 0; i < sourceLen; i++) {
     if (sourceData[i][1] !== '') {
        var data = {};

        data.interior           = sourceData[i][0];
        data.requerimento       = sourceData[i][1];
        data.autos              = sourceData[i][2];
        data.nome               = sourceData[i][3];
        data.cpf                = sourceData[i][4];
        data.valorArbitrado     = sourceData[i][5];
        data.valorDeferido      = sourceData[i][6];
        data.status             = sourceData[i][7];
        data.resultadoAnalise   = sourceData[i][8];
        data.mesPagamento       = sourceData[i][9];
        data.anoPagamento       = sourceData[i][10];
        data.valorComplementar  = sourceData[i][11];
        
        fireSinc().createDocument("Importação",data);
     }

  }
}
