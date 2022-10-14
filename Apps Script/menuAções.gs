function onOpen() {

  var ui = SpreadsheetApp.getUi();

  ui
  .createMenu('Ações')
  .addSubMenu(ui.createMenu('Atualizações - Arrumar').addItem('Atualizar com o firebase', '0'))
  .addToUi();
}
