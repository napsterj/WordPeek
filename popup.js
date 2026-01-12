
/*!
 * WordPeek Chrome Extension
 * Copyright (c) 2026 Abhishek Jadhav
 * All rights reserved.
 */

chrome.storage.sync.get(['meanings'], function(definitions) {        
    let actualMeanings = definitions.meanings;
        
    actualMeanings.forEach(element => {                                        
                                  const ulEle = this.document.createElement('ul')
                                  this.document.body.append(ulEle)
                                  const liEle = this.document.createElement('li')
                                  liEle.textContent = element
                                  ulEle.appendChild(liEle)                                  
                                })         

    chrome.storage.sync.get(['word'], (data) => document.getElementById('word').textContent += data.word)                                                    
})