const addFooters = (document) => {
    const pageCount = document.internal.getNumberOfPages()
  
    document.setFontSize(8)
    for (var i = 1; i <= pageCount; i++) {
        document.setPage(i)
        document.text('Page ' + String(i) + ' of ' + String(pageCount), document.internal.pageSize.width / 2, 610, {
        align: 'center'
      })
    }
  }
  module.exports={
    addFooters
  }