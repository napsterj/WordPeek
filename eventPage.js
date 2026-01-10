var menuItem = {
    id: "wordPeekId",
    title: "WordPeek",
    contexts: ['selection']
}
chrome.contextMenus.removeAll().then((res) => {
    chrome.contextMenus.create(menuItem)
})


var customPopup = {   
    "url": chrome.runtime.getURL("popup.html"), 
    "type": "popup",    
    "top": 4,
    "left": 4,
    "height": 400,
    "width": 400   
}

async function callDictionaryApi(word) {    
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"    
                        
    try 
    {
        return await fetch(url + word).then(response => response.json())
                                         .then(data => data[0])
                                         .then(actualData => {                
                                            let meanings = actualData.meanings            
                                            let definitions = [];
                                                meanings.forEach(def => {                                    
                                                  def.definitions.forEach(eachDef => {
                                                       definitions.push(eachDef.definition)
                                                  })                                                                                
                                                });
                                            return definitions;    
                                        })                                                         
    }
    catch(error) {
        console.log("Error:-", error.message)
    }
}

chrome.contextMenus.onClicked.addListener(async function (clickData){     
    if(clickData.menuItemId === "wordPeekId" && clickData.selectionText){        
        
        if(clickData.selectionText !== typeof clickData.selectionText === "string"){           
            return
        }
                
        let definitions = await callDictionaryApi(clickData.selectionText) 
        
        chrome.storage.sync.set({['meanings']: definitions})         
        chrome.storage.sync.set({['word']: clickData.selectionText})                      
    }
})