
var platform;
var repository;
var branch;
var node;
var repositoryId = '762dfadfb9251fdd8d66';
var branchId = 'c758483caa8ad40584ff';
var nodeId = '92cdc4826e9c96b5fd66'; //counter node
var schemaSource;
var optionsSource;
var dataSource;
//var pageIdToLoad = "21f5c2a082ab59f6391b";
var pageIdToLoad;
var username;
var password;
var nData= new Array();


function checkCred(){

 $("#loginContainer").append('<div id="dialog" title="Please Log In."><label>Username:</label><input id="txtUsername" name="txtUsername" type="text"><label>Password:</label><input id="txtPassword" name="txtPassword" type="password"><input id="submitButton" onclick="getPage()" name="Submit" type="button" value="Submit"><label id="lblLoginLable"></label></div>');
        $("#dialog").dialog({
            modal: true,
            draggable: false,
            width: "auto",
            position: {
                my: "top",
                at: "center",
                of: window
            },
            create: function(event, ui) {
                $(this).css("maxWidth", "300px");
            }

        });
}
//Switching from local developement to production will require switching config objects
//getPage(showForm);
function getConfig(){
    username = $("#txtUsername").val();
    password = $("#txtPassword").val();

    var config = {
        "clientKey": "26f9385c-5993-4fdb-b18b-a537e16cc721",
        "clientSecret": "Bi+EneT8H7oVSdFM3/zXilvt+FPDQrZC3RsWQb31OS4psIp/mbbfdnkHFN2GLDl4DFbJt52iQFQoohmdO0cC6TT6qQ/pqWKRM6IqBnemDSo=",
        "username": username,
        "password": password,
        "baseURL": "https://api.cloudcms.com",
        "application": "ae4e45352206df5ebff3"
    };
 //  $("#dialog").dialog("close");
    Gitana.connect(config, function(err) {
        if (err) {
            
        }
    }).then(function() {

        platform = this; 
        this.readRepository(repositoryId).then(function() {
            repository = this;
 
            this.readBranch(branchId).then(function() {
                branch = this;         
                
                 /* node = this.readNode(pageIdToLoad).then(function () {
                    callback && callback();
                });*/

            });
        });

       

    });
}
function getPage(callback) {

   
   
   username = $("#txtUsername").val();
   password = $("#txtPassword").val();

    var config = {
        "clientKey": "26f9385c-5993-4fdb-b18b-a537e16cc721",
        "clientSecret": "Bi+EneT8H7oVSdFM3/zXilvt+FPDQrZC3RsWQb31OS4psIp/mbbfdnkHFN2GLDl4DFbJt52iQFQoohmdO0cC6TT6qQ/pqWKRM6IqBnemDSo=",
        "username": username,
        "password": password,
        "baseURL": "https://api.cloudcms.com",
        "application": "ae4e45352206df5ebff3"
    };
   $("#dialog").dialog("close");
    Gitana.connect(config, function(err) {
        if (err) {
            
        }
    }).then(function() {

        platform = this; 
        this.readRepository(repositoryId).then(function() {
            repository = this;
 
            this.readBranch(branchId).then(function() {
                branch = this;    
               
                    //get all the navbar nodes from cloud
                    var newData= new Array(); 
                    branch.queryNodes({
                        "_type": "custom:navbar0"
                    }).each(function(id ,i,key) {
                    
                        var fileldValues = {};
                        fileldValues['key']= this.title;
                        fileldValues['titles']= this.getId(); 
                        
                       //newData[i]=fileldValues;
                        
                        nData.push(fileldValues);
                          
                    }).then(function(){
                        getNavbarDetails(nData); 
                            
                    });

                    //get all the page nodes from cloud
                    var newData_page= new Array(); 
                    branch.queryNodes({
                        "_type": "custom:page0"
                    }).each(function(id ,i,key) {
                    
                        var fileldValues = {};
                        fileldValues['key']= this.title;
                        fileldValues['titles']= this.getId(); 
                        
                       //newData[i]=fileldValues;
                        
                        newData_page.push(fileldValues);
                          
                    }).then(function(){
                        getPageDetails(newData_page); 
                            
                    });
                      
                   
                
            });
        });
       
   
    
    });
}

function getImages(){
    username = $("#txtUsername").val();
    password = $("#txtPassword").val();

    var config = {
        "clientKey": "26f9385c-5993-4fdb-b18b-a537e16cc721",
        "clientSecret": "Bi+EneT8H7oVSdFM3/zXilvt+FPDQrZC3RsWQb31OS4psIp/mbbfdnkHFN2GLDl4DFbJt52iQFQoohmdO0cC6TT6qQ/pqWKRM6IqBnemDSo=",
        "username": username,
        "password": password,
        "baseURL": "https://api.cloudcms.com",
        "application": "ae4e45352206df5ebff3"
    };
   $("#dialog").dialog("close");
    Gitana.connect(config, function(err) {
        if (err) {
            
        }
    }).then(function() {

        platform = this; 
        this.readRepository(repositoryId).then(function() {
            repository = this;
 
            this.readBranch(branchId).then(function() {
                branch = this;         
                
                 /* node = this.readNode(pageIdToLoad).then(function () {
                    callback && callback();
                });*/
                var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
                    
                    ct="https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/be1d4801be57fd2423db/attachments" ;
                    $.ajax({
                        type: "GET",
                        url: ct, 
                        headers: {
                            authorization: authorizationHeader
                        },
                        success: function (response) {
                            var count=0; 
                            var newData= new Array();
                            for ( var i=0; i < response['rows'].length; i++){
                                var data_arr={};
                                x= response['rows'][i];                               
                                
                                if(x['filename'].substr(x['filename'].indexOf('.')+1) == 'jpg' || x['filename'].substr(x['filename'].indexOf('.')+1) == 'png') {
                                     
                                    data_arr ['pic'] = count;
                                    data_arr ['ar'] = ct + '/' + x['attachmentId']
                                    data_arr ['cpy'] = ct + '/' + x['filename']

                                    newData.push(data_arr);
                                    count++;
                                }    
                                
                            }
                            document.cookie = "image_data =" + JSON.stringify(newData);
                            
                          
                           
                        }
                    });
            });
        });

       

    });
                     
} 
 

function getNavbarDetails(newData){ 
  // console.log(JSON.stringify(newData) + '///')
    /* Edit existing nav item */ 
    $("#drp").alpaca({
        "data": newData,
        "schema": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "key": {
                        "type": "string",
                        "title": "NavigationName"
                    },
                    "titles":{
                        "type": "string",
                        "title": "Titles"
                    },
                    
                    "edit": {
                        "type": "boolean",
                        "title": "Edit"
                    } ,
                    
                    "Delete": {
                        "type": "boolean",
                        "title": "Delete"
                    } 
                }
            } 
        },
        "options": {
            "type": "table",
            
            "showActionsColumn": false,
            "items": {
                "fields":{
                    "titles":{
                        "type":"hidden"
                    }
                }
            },
            
            "form": {
                "buttons": {
                      "addRow": {
                        "title": "Add New NavItem",
                        "click": function() {
                            $("#drp").css('display','none');
                            $("#drp1").css('display','block');
                        }
                    },
                    "submit": {
                        "click": function() {
                            var value = this.getValue();
                           
                             for ( var i=0; i < value.length;i++) {
                               if(value[i].edit==true){                        
                                    loadNav(value[i].titles);
                               }
                              
                               if(value[i].Delete==true){   
                                    node = branch.readNode(value[i].titles).then(function () {
                                    
                                      node.del().then(function () {
                                         alert("Navbar Item deleted successfully.");
                                         location.reload();
                                    });
                               });
                               } 
                              
                            }   
     
                        }
                    }
                }
            }
        }
    });

    /*Add new nav item*/ 
    $("#drp1").alpaca({
       "view": "bootstrap-edit",
        "data": node,
        "schema": { 
            "type": "object",
            "properties": {                 
                        "title": {
                            "type": "string",
                            "title": "title",
                            "readonly": false,
                            "disallow": []
                        },
                        "description": {
                            "type": "string",
                            "title": "description",
                            "readonly": false,
                            "disallow": []
                        },
                        "text": {
                            "type": "string",
                            "title": "text"
                        },
                        "url": {
                            "type": "string",
                            "title": "url",
                            "readonly": false,
                            "disallow": []
                        },
                        "priority": {
                            "type": "number",
                            "title": "priority",
                            "readonly": false,
                            "disallow": []
                        },
                        "children": {
                            "type": "array",
                            "title": "children",
                            "readonly": false,
                            "disallow": [],
                            "items": {
                                "type": "object",
                                "title": "menuItem",
                                "properties": {
                                    "title": {
                                        "type": "string",
                                        "title": "title",
                                        "readonly": false,
                                        "disallow": []
                                    },
                                    "text": {
                                        "type": "string",
                                        "title": "text"
                                    },
                                    "description": {
                                        "type": "string",
                                        "title": "description",
                                        "readonly": false,
                                        "disallow": []
                                    },
                                    "url": {
                                        "type": "string",
                                        "title": "url",
                                        "readonly": false,
                                        "disallow": []
                                    }
                                }
                            }
                        }
             },      
         "_parent": "n:node",
        "description": "custom:navbar0",
        "$schema": "http://json-schema.org/draft-04/schema#",
         "items": {}
        },
        "options": { 
            "form": {
                "buttons":{
                    "submit": {
                        "click": function() {
                            clearTimer();
                           
                            setTimer();  
                            var value = this.getValue();
                            
                            branch.createNode({
                                "title": value.title,
                                "description": value.description,
                                "text" : value.text,
                                "url" : value.url,
                                "priority" : value.priority,                                                  
                                "children" : value.children,
                                "_type": 'custom:navbar0'
                            
                            }).then(function () {
                                alert("Navbar Item created successfully.");
                                location.reload();
                            });
                         }
                    }
                }            
            }
        }
    });
}

function getPageDetails(nPageData){
    /* Edit existing page */ 
    $("#pageDisp").alpaca({
        "data": nPageData,
        "schema": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "key": {
                        "type": "string",
                        "title": "PageName"
                    },
                    "titles":{
                        "type": "string",
                        "title": "Titles"
                    },
                    
                    "edit": {
                        "type": "boolean",
                        "title": "Edit"
                    } ,
                    
                    "Delete": {
                        "type": "boolean",
                        "title": "Delete"
                    } 
                }
            }
        },
        "options": {
            "type": "table",
            "showActionsColumn": false,
            "items": {
                "fields":{
                    "titles":{
                        "type":"hidden"
                    }
                }
            },
            
            "form": {
                "buttons": {
                      "addRow": {
                        "title": "Add New page",
                        "click": function() {
                            $("#pageDisp").css('display','none');
                            $("#pageDisp1").css('display','block');
                        }
                    },
                    "submit": {
                        "click": function() {
                            var value = this.getValue();                        
                            for ( var i=0; i < value.length;i++) {
                               if(value[i].edit==true){          
                                         
                                    loadPage(value[i].titles);
                               }                           
                            }   
                        }
                    }
                }
            }
        }
    });
    getImages();
    //get images parsed from cookie
   /* var value = document.cookie;
    var parts = value.split( name + "=");
    var img= parts[1];
    var img_parsed = JSON.parse(img);
    var imgData= new Array();
    for (var i =0 ; i< img_parsed.length ; i++){          
        var fileldValues = {};
        fileldValues= img_parsed[i]['cpy'];
         imgData.push(fileldValues);
                    
    }

    var f = (imgData);
    console.log(f);
    /*Add new page  */ 
    var img_u = {
        "ls": ['images/pic01.jpg']
    };
     
    /*var img_u = {
        "ls":  f
    };*/

     var x  = document.cookie;
     var cookieGroup =[];

          var doc_cookie = document.cookie.split(";");
          
          for(var i = 0; i < doc_cookie.length ; i++){

            var name= doc_cookie[i].split("=")[0].trim();
            if(name=='image_data')
                 var language_1= doc_cookie[i].split("=")[1];
            if(name=='selected_image')
                 var location_1= doc_cookie[i].split("=")[1];
              
               
          }
 
    var actual_img = JSON.parse(language_1);
    var img_data_capture = [];
    for(i=0;i<actual_img.length;i++){
        img_data_capture[i]=actual_img[i]['ar']
    }
    console.log(img_data_capture)

    $("#pageDisp1").alpaca({
       "view": "bootstrap-edit",
        "data": node,
        "schema": { 
            "type": "object",
             "properties": {
                    "title": {
                        "type": "string",
                        "title": "title"
                    },
                    "description": {
                        "type": "string",
                        "title": "description"
                    },
                    "header": {
                        "type": "string",
                        "title": "header"
                    },
                    "subHeader": {
                        "type": "string",
                        "title": "subHeader"
                    },
                    "bodyHeader": {
                        "type": "string",
                        "title": "bodyHeader"
                    },
                    "body": {
                        "type": "string",
                        "title": "body"
                    },
                    "bodyImage": {
                        "type": "string",
                        "title": "bodyImage"
                    },
                    "img_ux":{
                        "title": "Existing images",
                        "type": "select",
                         "enum":img_data_capture
                    },
                      
                    "footer": {
                        "type": "string",
                        "title": "footer"
                    },
                    "priority": {
                        "type": "number",
                        "title": "priority"
                    },
                    "default": {
                        "type": "boolean",
                        "title": "default"
                    },
                    "template": {
                        "type": "string",
                        "title": "template",
                        "enum": [
                            "homePage",
                            "leftSideBarPage",
                            "rightSideBarPage"
                        ]
                    },
                    "portfolioSectionHeader": {
                        "type": "string",
                        "title": "portfolioSectionHeader"
                    },
                    "portfolioSectionSubHeader": {
                        "type": "string",
                        "title": "portfolioSectionSubHeader"
                    },
                    "portfolioItems": {
                        "type": "array",
                        "title": "portfolioItemsHeader",
                        "items": {
                            "type": "object",
                            "title": "portfolioItem",
                            "properties": {
                                "imageUrl": {
                                    "type": "string",
                                    "title": "imageUrl"
                                },
                                "portfolioItemHeader": {
                                    "type": "string",
                                    "title": "portfolioItemHeader"
                                },
                                "portfolioItemBody": {
                                    "type": "string",
                                    "title": "portfolioItemBody"
                                }
                            }
                        }
                    },
                    "sideLinksHeader": {
                        "type": "string",
                        "title": "sideLinksHeader"
                    },
                    "sideLinks": {
                        "type": "array",
                        "title": "sideLinks",
                        "items": {
                            "type": "object",
                            "title": "sideLink",
                            "properties": {
                                "sideLinkUrl": {
                                    "type": "string",
                                    "title": "sideLinkUrl"
                                },
                                "sideLinkText": {
                                    "type": "string",
                                    "title": "sideLinkText"
                                }
                            }
                        }
                    },
                    "sideBarItems": {
                        "type": "array",
                        "title": "sideBarItems",
                        "items": {
                            "type": "object",
                            "title": "sideBarItem",
                            "properties": {
                                "sideBarItemHeader": {
                                    "type": "string",
                                    "title": "sideBarItemHeader"
                                },
                                "sideBarItemBody": {
                                    "type": "string",
                                    "title": "sideBarItemBody"
                                }
                            }
                        }
                    },
                    "tiles": {
                        "type": "array",
                        "title": "tiles",
                        "items": {
                            "type": "object",
                            "title": "tile",
                            "properties": {
                                "fontAwesomeIcon": {
                                    "type": "string",
                                    "title": "fontAwesomeIcon"
                                },
                                "header": {
                                    "type": "string",
                                    "title": "header"
                                },
                                "body": {
                                    "type": "string",
                                    "title": "body"
                                }
                            }
                        }
                    }
             },      
             "_parent": "n:node",
            "description": "custom:page0",
            "$schema": "http://json-schema.org/draft-04/schema#",
            "items": {}
        },
        "options": { 
            "form": {
                "buttons":{
                    "submit": {
                        "click": function() {
                            clearTimer();
                           
                            setTimer();  
                            var value = this.getValue();
                            
                            branch.createNode({
                                "title": value.title,
                                "description": value.description,
                                "header" : value.header,
                                "subHeader" : value.subHeader,
                                "bodyHeader" : value.bodyHeader,
                                "body" : value.body,
                                "bodyImage" : value.bodyImage,
                                "footer" : value.footer,                                                  
                                "priority" : value.priority,
                                "default" : value.default,
                                "template" : value.template,
                                "portfolioSectionHeader" : value.portfolioSectionHeader,
                                "portfolioSectionSubHeader" : value.portfolioSectionSubHeader,
                                "portfolioItems" : value.portfolioItems,
                                "sideLinksHeader" : value.sideLinksHeader,
                                "sideLinks" : value.sideLinks,
                                "sideBarItems" : value.sideBarItems,
                                "tiles" : value.tiles,
                                "_type": 'custom:page0'
                            
                            }); 
                         }
                    }
                }            
            }
        }
    });
}
  

function loadNav(navId) {  
    pageIdToLoad = navId || "96584a504c4da54a34fb";
    node = branch.readNode(pageIdToLoad).then(function() { 
        showForm();         
    });
}

function loadPage(pageId) {
    pageIdToLoad = pageId || "9bccae4f5d0cc8ed0ed4";
    //reShowForm();
     //console.log('alpaca vale' + $("#alpaca3").val());
    node = branch.readNode(pageIdToLoad).then(function() {            
        showFormPage();
    });
}



function reShowForm() {

    clearTimer();
    console.log("Timer Cleared");
    setTimer();
    console.log("Timer Set");
    //console.log(pageIdToLoad + '==' + branch);
 
    node = branch.readNode(pageIdToLoad).then(function() {
 
            showForm(); 
    });
}


function showForm() {
    $("#myform1").html("");
    
    $("#myform1").alpaca({
        "view": "bootstrap-edit",
        "data": node,
        "schema": {
            "title": "Edit Page",
            "type": "object",
            "properties": {                 
                    "title": {
                        "type": "string",
                        "title": "title",
                        "readonly": false,
                        "disallow": []
                    },
                    "description": {
                        "type": "string",
                        "title": "description",
                        "readonly": false,
                        "disallow": []
                    },
                    "text": {
                        "type": "string",
                        "title": "text"
                    },
                    "url": {
                        "type": "string",
                        "title": "url",
                        "readonly": false,
                        "disallow": []
                    },
                    "priority": {
                        "type": "number",
                        "title": "priority",
                        "readonly": false,
                        "disallow": []
                    },
                    "children": {
                        "type": "array",
                        "title": "children",
                        "readonly": false,
                        "disallow": [],
                        "items": {
                            "type": "object",
                            "title": "menuItem",
                            "properties": {
                                "title": {
                                    "type": "string",
                                    "title": "title",
                                    "readonly": false,
                                    "disallow": []
                                },
                                "text": {
                                    "type": "string",
                                    "title": "text"
                                },
                                "description": {
                                    "type": "string",
                                    "title": "description",
                                    "readonly": false,
                                    "disallow": []
                                },
                                "url": {
                                    "type": "string",
                                    "title": "url",
                                    "readonly": false,
                                    "disallow": []
                                }
                            }
                        }
                    }
                },            
            "_parent": "n:node",
            "description": "custom:navbar0",
            "$schema": "http://json-schema.org/draft-04/schema#",         
            "items": {}
        },
        "options": {
            "form": {
                "buttons": {
                    "submit": {
                        "click": function() {
                            clearTimer();
                            console.log("Timer Cleared");
                            setTimer();
                            console.log("Timer Set");

                            var value = this.getValue();
                       
                            node.title = value.title;
                            node.description = value.description;
                            node.text = value.text;
                            node.url = value.url;
                            node.priority = value.priority;
                                                  
                            node.children = value.children;
                             
                            node.update().then(function() {
                                alert("Form Submitted")
                            });
                        }
                    }
                }
            },
            "title": "newPageTitle",
            "engineId": "alpaca100",
            "fields": {
                "title": {
                    "type": "text"
                },
                "description": {
                    "type": "text"
                },
                "text": {
                    "type": "text"
                },
                "url": {
                     "type": "text"
                },
                "priority": {
                     "type": "text"
                }
                   
            }
        }
    });

} //alpaca   
 



function showFormPage() {


    $("#myform").html(""); 
    
  var doc_cookie = document.cookie.split(";");
  
  for(var i = 0; i < doc_cookie.length ; i++){

    var name= doc_cookie[i].split("=")[0].trim();
    if(name=='image_data')
         var language_1= doc_cookie[i].split("=")[1];
    
  }

    var actual_img = JSON.parse(language_1);
     
    var img_data_capture = [];
    for(i=0;i<actual_img.length;i++){
        img_data_capture[i]=actual_img[i]['ar']
    }
 
    console.log(img_data_capture);

    $("#myform").alpaca({
            "view": "bootstrap-edit",
            "data": node,
            "schema": {
                "title": "Edit Page",
                "type": "object",
                "properties": {
                    "title": {
                        "type": "string",
                        "title": "title"
                    },
                    "description": {
                        "type": "string",
                        "title": "description"
                    },
                    "header": {
                        "type": "string",
                        "title": "header"
                    },
                    "subHeader": {
                        "type": "string",
                        "title": "subHeader"
                    },
                    "bodyHeader": {
                        "type": "string",
                        "title": "bodyHeader"
                    },
                    "body": {
                        "type": "string",
                        "title": "body"
                    },
                    "bodyImage": {
                        "type": "string",
                        "title": "bodyImage"
                    },
                    "img_ux":{
                        "title": "Existing images",
                        "type": "select",
                         "enum": img_data_capture
                    },
                      
                    "footer": {
                        "type": "string",
                        "title": "footer"
                    },
                    "priority": {
                        "type": "number",
                        "title": "priority"
                    },
                    "default": {
                        "type": "boolean",
                        "title": "default"
                    },
                    "template": {
                        "type": "string",
                        "title": "template",
                        "enum": [
                            "homePage",
                            "leftSideBarPage",
                            "rightSideBarPage"
                        ]
                    },
                    "portfolioSectionHeader": {
                        "type": "string",
                        "title": "portfolioSectionHeader"
                    },
                    "portfolioSectionSubHeader": {
                        "type": "string",
                        "title": "portfolioSectionSubHeader"
                    },
                    "portfolioItems": {
                        "type": "array",
                        "title": "portfolioItemsHeader",
                        "items": {
                            "type": "object",
                            "title": "portfolioItem",
                            "properties": {
                                "imageUrl": {
                                    "type": "string",
                                    "title": "imageUrl"
                                },
                                "portfolioItemHeader": {
                                    "type": "string",
                                    "title": "portfolioItemHeader"
                                },
                                "portfolioItemBody": {
                                    "type": "string",
                                    "title": "portfolioItemBody"
                                }
                            }
                        }
                    },
                    "sideLinksHeader": {
                        "type": "string",
                        "title": "sideLinksHeader"
                    },
                    "sideLinks": {
                        "type": "array",
                        "title": "sideLinks",
                        "items": {
                            "type": "object",
                            "title": "sideLink",
                            "properties": {
                                "sideLinkUrl": {
                                    "type": "string",
                                    "title": "sideLinkUrl"
                                },
                                "sideLinkText": {
                                    "type": "string",
                                    "title": "sideLinkText"
                                }
                            }
                        }
                    },
                    "sideBarItems": {
                        "type": "array",
                        "title": "sideBarItems",
                        "items": {
                            "type": "object",
                            "title": "sideBarItem",
                            "properties": {
                                "sideBarItemHeader": {
                                    "type": "string",
                                    "title": "sideBarItemHeader"
                                },
                                "sideBarItemBody": {
                                    "type": "string",
                                    "title": "sideBarItemBody"
                                }
                            }
                        }
                    },
                    "tiles": {
                        "type": "array",
                        "title": "tiles",
                        "items": {
                            "type": "object",
                            "title": "tile",
                            "properties": {
                                "fontAwesomeIcon": {
                                    "type": "string",
                                    "title": "fontAwesomeIcon"
                                },
                                "header": {
                                    "type": "string",
                                    "title": "header"
                                },
                                "body": {
                                    "type": "string",
                                    "title": "body"
                                }
                            }
                        }
                    }
                },
                "_parent": "n:node",
                "description": "custom:page0",
                "$schema": "http://json-schema.org/draft-04/schema#",         
                "items": {}
            },
            "options": {
                "form": {
                    "buttons": {
                        "submit": {
                            "click": function() {
                                clearTimer();
                                console.log("Timer Cleared");
                                setTimer();
                                console.log("Timer Set");

                                var value = this.getValue();
                             
                                node.title = value.title;
                                node.template = value.template;
                                node.header = value.header;
                                node.subHeader = value.subHeader;
                                node.bodyHeader = value.bodyHeader;
                                node.body = value.body;
                                node.bodyImage = value.bodyImage;
                                node.footer = value.footer;                            
                                node.priority = value.priority;
                                node.default = value.default;
                                node.portfolioSectionHeader = value.portfolioSectionHeader;
                                node.portfolioSectionSubHeader = value.portfolioSectionSubHeader;
                                node.portfolioItems = value.portfolioItems;
                                node.sideLinksHeader  = value.sideLinksHeader;
                                node.sideLinks  = value.sideLinks;
                                node.sideBarItems  = value.sideBarItems;
                                node.tiles  = value.tiles;

                               // node.children = value.children;
                                 
                                node.update().then(function() {
                                    alert("Form Submitted")
                                });
                            }
                        }
                    }
                },
                
                    
                "title": "newPageTitle",
                "engineId": "alpaca2",
                "fields": {
                    "title": {
                        "type": "text"
                    },
                    "description": {
                        "type": "text"
                    },
                    "header": {
                        "type": "text"
                    },
                    "subHeader": {
                        "type": "text"
                    },
                    "bodyHeader": {
                        "type": "text"
                    },
                    "body": {
                         "type": "ckeditor",
                         "ckeditor": {
                            "toolbar": [
                                ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList', 'Link', 'Unlink'], ['Table', 'Source']
                            ],                        
                            "height":"220"
                        }
                    },
                    "bodyImage": {
                         "type": "image",
                         "height":"160",
                         "width":"160"
                    },
                    "img_ux":{
                        "type":"select",
                        "optionLabels": img_data_capture
                    },
                    
                    "footer": {
                        "type": "textarea" 
                    },
                    "priority": {
                        "type": "number" 
                    },
                    "template": {
                         "optionLabels": ["homePage","leftSideBarPage","rightSideBarPage"]
                    },
                    "portfolioSectionHeader": {
                        "type": "text" 
                    },
                    "portfolioSectionSubHeader": {
                        "type": "text" 
                    },
                     "portfolioItems": {
                        "type":"array",
                        "items":{
                            "fields":{ 
                                    "imageUrl":{
                                        "type":"image"
                                    },
                                    "portfolioItemHeader":{
                                         "type":"text"
                                     },
                                      "portfolioItemBody": {
                                            "type":"ckeditor",
                                               "ckeditor": {
                                                    "toolbar": [
                                                        ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList', 'Link', 'Unlink'], ['Table', 'Source']
                                                    ],
                                                    
                                                    "height":"220"
                                                }        
                                        }
                                        
                                }
                            }
                         
                     },
                    "sideLinksHeader":{
                        "type":"text"
                     },
                    "sideLinks":{
                       "type":"array",
                        "items":{
                            "fields":{
                                "sideLinkUrl":{
                                    "type":"text"
                                } ,
                                "sideLinkText":{
                                   "type":"text" 
                                }

                            }
                        }
                    },
                     "sideBarItems": {
                        "type": "array",
                        
                        "items": {
                            "fields": {
                                "sideBarItemHeader": {
                                    "type": "text" 
                                },
                                "sideBarItemBody": {
                                    "type": "text" 
                                }
                            }
                        }
                   
                    },"tiles": {
                        "type": "array",
                         
                        "items": {
                            "fields": {
                                "fontAwesomeIcon": {
                                    "type": "text" 
                                },
                                "header": {
                                    "type": "text" 
                                },
                                "body": {
                                    "type": "ckeditor",
                                       "ckeditor": {
                                            "toolbar": [
                                                ['Bold', 'Italic', 'Underline', 'Cut', 'Copy', 'Paste'], ['NumberedList', 'BulletedList', 'Link', 'Unlink'], ['Table', 'Source']
                                            ],
                                            
                                            "height":"220"
                                       }
                                }
                            }
                        }
                    }
                       
                }

            },
            "postRender": function(control) {
                var new_image = control.childrenByPropertyId["img_ux"];
                   
                    new_image.on('change', function(val) {
                        //alert("Val = " + val + flavour) ;
                        this.schema.data = val;                    
                        
                        var x=  this.schema.data.target.value ;
                        $('#dialog-modal').dialog('open');
                         $("#dimg").attr('src',x);  
                         document.cookie="selected_image="+x; 
                        //this.refresh();
                    });

            } 
    });


} //alpaca   

var timer;

function setTimer() {
    timer = setTimeout(function() {
        location.reload();
    }, 900000);
}

function clearTimer() {
    clearTimeout(timer);
}

 
//This is form upload scripting here--------------------------------------------
function getAttachments(type){
     $("#imgtbl").css('display','none');
     $("#doctbl").css('display','none');
    //"username": "0231d383-f2ab-4f22-99a5-31b0a3d5cd93",        
    //"password": "ecCD8Nwvwq9DsfCvzPA8IWhGgWHibtrBdJgd8i9602Q0q7xJMN21gbSEqUUYaOqHQRZ75jzg/Tt4BNPajKOdIx18a26AXP8RQonmjLmvsWQ=",
    username = $("#txtUsername").val();
    password = $("#txtPassword").val();
    var config = {
        "clientKey": "26f9385c-5993-4fdb-b18b-a537e16cc721",
        "clientSecret": "Bi+EneT8H7oVSdFM3/zXilvt+FPDQrZC3RsWQb31OS4psIp/mbbfdnkHFN2GLDl4DFbJt52iQFQoohmdO0cC6TT6qQ/pqWKRM6IqBnemDSo=",
        "username":username,
        "password":password,
        "baseURL": "https://api.cloudcms.com",
        "application": "ae4e45352206df5ebff3"
    };

    Gitana.connect(config, function(err) {
        if (err) {
            
        }
    }).then(function() {
        platform = this; 
        this.readRepository(repositoryId).then(function() {
            repository = this;
 
            this.readBranch(branchId).then(function() {
                branch = this;         
 
                
               var ContainerId = 'be1d4801be57fd2423db';
                  node = this.readNode(ContainerId).then(function () {                 
                    
                    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
                    
                    ct="https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/be1d4801be57fd2423db/attachments" ;
                    $.ajax({
                        type: "GET",
                        url: ct, 
                        headers: {
                            authorization: authorizationHeader
                        },
                        success: function (response) {
                            $("#imgtbl").css('display','block');
                            var count=0; 
                            var newData= new Array(); 

                            for ( var i=0; i < response['rows'].length; i++){
                                    var data_arr={};

                                x= response['rows'][i];                               
                                if(type=='image'){
                                    if(x['filename'].substr(x['filename'].indexOf('.')+1) == 'jpg' || x['filename'].substr(x['filename'].indexOf('.')+1) == 'png') {
                                         
                                        data_arr ['pic'] = count;
                                        data_arr ['ar'] = ct + '/' + x['attachmentId']
                                        data_arr ['cpy'] = ct + '/' + x['filename'] 
                                        newData.push(data_arr); 
                                        count++; 
                                    }    
                                }/*else if(type=='doc'){
                                    var extn = x['filename'].substr(x['filename'].indexOf('.')+1);
                                     if((extn !== 'jpg')) {
                                        data_arr ['pic'] = count;
                                        data_arr ['ar'] = ct + '/' + x['attachmentId']
                                        data_arr ['cpy'] = ct + '/' + x['filename'] 
                                        newData.push(data_arr); 
                                        count++; 
                                    }
                                }*/
                            }                             
                            if(count > 0){                              
                                  $("#imgtbl").alpaca({
                                        "data": JSON.stringify(newData),
                                         "schema": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "pic": {
                                                        "type": "string",
                                                        "title": "Pic"
                                                    },                                                    
                                                    "ar": {
                                                        "type": "string",
                                                        "title": "Images"
                                                    }, "cpy": {
                                                        "type": "string",
                                                        "title": "Images"
                                                    }, 
                                                     "copyUrl": {
                                                        "type": "boolean",
                                                        "title": "Copy URL"
                                                    } ,                                          
                                                    "delete": {
                                                        "type": "boolean",
                                                        "title": "Delete"
                                                    }
                                                     
                                                }
                                            }
                                        }, 
                                        "options": {
                                               "type": "table",
                                                "showActionsColumn": false,  
                                                 "items": {
                                                     "fields":{
                                                        "pic":{
                                                            "type":"hidden"
                                                         },  
                                                         "cpy":{
                                                            "type":"hidden"
                                                         },                          
                                                        "ar": {
                                                            "type": "image",                                  
                                                             "view": "bootstrap-display",
                                                            "height":"60",
                                                            "width":"60"
                                                        }
                                                    }  
                                                },
        
                                                "form": {
                                                    "buttons": {
                                                          "addRow": {
                                                            "title": "Upload New Image",
                                                            "click": function() {
                                                                 $("#frmeditSubmitForm5").css('display','block');
                                                            }
                                                        },
                                                        "submit": {
                                                            "click": function() {
                                                                var value = this.getValue();                        
                                                                for ( var i=0; i < value.length;i++) {
                                                                    
                                                                    if(value[i].copyUrl==true){    
                                                                      copyReturn =  copyToClipboard(value[i].cpy);
                                                                      if(copyReturn ){
                                                                        alert("Click Ctrl+V to see clipboard contents");
                                                                      }
                                                                    }  
                                                                    if(value[i].delete==true){
                                                                        if(type=='image'){
                                                                            ct_del=value[i].ar ;
                                                                            $.ajax({                                                                       
                                                                                url: ct_del, 
                                                                                type: 'delete', 
                                                                                headers: {
                                                                                   authorization: authorizationHeader
                                                                                },
                                                                                success: function (response) {
                                                                                    alert('Image has been deleted successfully');
                                                                                    location.reload();
                                                                                 
                                                                                },
                                                                                error: function(jqXHR, textStatus, errorThrown) { 
                                                                                      console.log(jqXHR + "---" + textStatus + '//' + errorThrown);
                                                                                }
                                                                            }); 
                                                                        }
                                                                      /*  node = branch.readNode('22c94d3907b196478201').then(function () {
                                                                        console.log(node);
                                                                         /* node.del().then(function () {
                                                                             alert("Navbar Item deleted successfully.");
                                                                             location.reload();
                                                                        }); 
                                                                            
                                                                    });  */                                
                                                                   }

                                                                }   
                                                            }
                                                        }
                                                    }
                                                }
                                                
                                        },
                                         "postRender": function() {
                                            
                                            var control = $("#imgtbl").alpaca("get");
                                            control.refresh(function() {
                                                // behold, i am the callback that is fired once the refresh completes
                                            });
                                        }
                                    });
                                }
                             },
                             error: function(jqXHR, textStatus, errorThrown) { 
                              console.log(jqXHR + "---" + textStatus + '//' + errorThrown);
                            }
                     });



                });
            });
        });      

    });

}

function getDocuments(type){
     $("#doctbl").css('display','none');
     $("#imgtbl").css('display','none');
    //"username": "0231d383-f2ab-4f22-99a5-31b0a3d5cd93",        
    //"password": "ecCD8Nwvwq9DsfCvzPA8IWhGgWHibtrBdJgd8i9602Q0q7xJMN21gbSEqUUYaOqHQRZ75jzg/Tt4BNPajKOdIx18a26AXP8RQonmjLmvsWQ=",
    username = $("#txtUsername").val();
    password = $("#txtPassword").val();
    var config = {
        "clientKey": "26f9385c-5993-4fdb-b18b-a537e16cc721",
        "clientSecret": "Bi+EneT8H7oVSdFM3/zXilvt+FPDQrZC3RsWQb31OS4psIp/mbbfdnkHFN2GLDl4DFbJt52iQFQoohmdO0cC6TT6qQ/pqWKRM6IqBnemDSo=",
        "username":username,
        "password":password,
        "baseURL": "https://api.cloudcms.com",
        "application": "ae4e45352206df5ebff3"
    };

    Gitana.connect(config, function(err) {
        if (err) {
            
        }
    }).then(function() {
        platform = this; 
        this.readRepository(repositoryId).then(function() {
            repository = this;
 
            this.readBranch(branchId).then(function() {
                branch = this;         
 
                
               var ContainerId = 'be1d4801be57fd2423db';
                  node = this.readNode(ContainerId).then(function () {                 
                    
                    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
                    
                    ct="https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/be1d4801be57fd2423db/attachments" ;
                    $.ajax({
                        type: "GET",
                        url: ct, 
                        headers: {
                            authorization: authorizationHeader
                        },
                        success: function (response) {
                            $("#doctbl").css('display','block');
                            var count=0; 
                            var newData= new Array(); 

                            for ( var i=0; i < response['rows'].length; i++){
                                    var data_arr={};

                                x= response['rows'][i];  
                                console.log(x)                             
                                  if(type=='doc'){
                                    var ctnType= x['contentType'];
                                    //console.log(ctnType.indexOf('image') == -1); 
                                    var extn = x['filename'].substr(x['filename'].indexOf('.')+1);
                                     if((ctnType.indexOf('image') == -1)) {
                                        data_arr ['doc'] = x['filename'];
                                        data_arr ['ar'] = ct + '/' + x['attachmentId']
                                        data_arr ['cpy'] = ct + '/' + x['filename'] 
                                        newData.push(data_arr); 
                                        count++; 
                                    }
                                } 
                            }                             
                            if(count > 0){                              
                                  $("#doctbl").alpaca({
                                        "data": JSON.stringify(newData),
                                         "schema": {
                                            "type": "array",
                                            "items": {
                                                "type": "object",
                                                "properties": {
                                                    "doc": {
                                                        "type": "string",
                                                        "title": "Document"
                                                    },                                                    
                                                    "ar": {
                                                        "type": "string",
                                                        "title": "Images"
                                                    }, "cpy": {
                                                        "type": "string",
                                                        "title": "Images"
                                                    }, 
                                                     "copyUrl": {
                                                        "type": "boolean",
                                                        "title": "Copy URL"
                                                    } ,                                          
                                                    "delete": {
                                                        "type": "boolean",
                                                        "title": "Delete"
                                                    }
                                                     
                                                }
                                            }
                                        }, 
                                        "options": {
                                               "type": "table",
                                                "showActionsColumn": false,  
                                                 "items": {
                                                     "fields":{
                                                        "doc":{
                                                            "type":"text"
                                                         },  
                                                         "cpy":{
                                                            "type":"hidden"
                                                         },                          
                                                        "ar": {
                                                            "type": "hidden"                                 
                                                            
                                                        }
                                                    }  
                                                },
        
                                                "form": {
                                                    "buttons": {
                                                          "addRow": {
                                                            "title": "Upload New Document",
                                                            "click": function() {
                                                                 $("#frmeditSubmitForm5").css('display','block');
                                                            }
                                                        },
                                                        "submit": {
                                                            "click": function() {
                                                                var value = this.getValue();                        
                                                                for ( var i=0; i < value.length;i++) {
                                                                    
                                                                    if(value[i].copyUrl==true){    
                                                                      copyReturn =  copyToClipboard(value[i].cpy);
                                                                      if(copyReturn ){
                                                                        alert("Click Ctrl+V to see clipboard contents");
                                                                      }
                                                                    }  
                                                                    if(value[i].delete==true){
                                                                        
                                                                            ct_del=value[i].ar ;
                                                                            $.ajax({                                                                       
                                                                                url: ct_del, 
                                                                                type: 'delete', 
                                                                                headers: {
                                                                                   authorization: authorizationHeader
                                                                                },
                                                                                success: function (response) {
                                                                                    alert('Image has been deleted successfully');
                                                                                    location.reload();
                                                                                 
                                                                                },
                                                                                error: function(jqXHR, textStatus, errorThrown) { 
                                                                                      console.log(jqXHR + "---" + textStatus + '//' + errorThrown);
                                                                                }
                                                                            }); 
                                                                       
                                                                                                   
                                                                   }

                                                                }   
                                                            }
                                                        }
                                                    }
                                                }
                                                
                                        },
                                         "postRender": function() {
                                            
                                            var control = $("#imgtbl").alpaca("get");
                                            control.refresh(function() {
                                                // behold, i am the callback that is fired once the refresh completes
                                            });
                                        }
                                    });
                                }
                             },
                             error: function(jqXHR, textStatus, errorThrown) { 
                              console.log(jqXHR + "---" + textStatus + '//' + errorThrown);
                            }
                     });



                });
            });
        });      

    });

}

function submitForm() {
    var formData = new FormData($("#frmeditSubmitForm5")[0]);

    var authorizationHeader = platform.getDriver().getHttpHeaders()["Authorization"];
    var form = $("#frmeditSubmitForm5");
    var ContainerId="be1d4801be57fd2423db";
    $.ajax({
        type: "POST",
        url: "https://api.cloudcms.com/repositories/" + repositoryId + "/branches/" + branchId + "/nodes/" + ContainerId + "/attachments/" + ($("#uploadFilenameEdit5").val()).replace(" ", "_") + "/",
        data: formData,
        contentType: false,
        processData: false,
        headers: {
            authorization: authorizationHeader
        },
        success: function (response) {
        
        }
    });
}

//This ends form upload scripting-----------------------------------------------
 


function logout() {
    Gitana.deleteCookie("password", "/secure-bsc-admin");
    Gitana.deleteCookie("username", "/secure-bsc-admin");
    Gitana.deleteCookie("password", "/localhost");
    Gitana.deleteCookie("username", "/localhost");
    Gitana.deleteCookie("password", "/");
    Gitana.deleteCookie("username", "/");

    platform.logout();
    open("alpaca2.html", "_self");
}




var fl = document.getElementById('myFileUpload5');
/*
fl.onchange = function(e) {
    var ext = this.value.match(/\.(.+)$/)[1];
    switch (ext) {
        case 'pdf':
            console.log('pdf file type allowed');
            break;
        case 'xls':
            console.log('xls file type allowed');
            break;
        case 'xlsx':
            console.log('xlsx file type allowed');
            break;
        case 'pptx':
            console.log('pptx file type allowed');
            break;
        case 'ppt':
            console.log('ppt file type allowed');
            break;
        case 'pptm':
            console.log('pptm file type allowed');
            break;
        default:
            alert('Pdf , ppt or xls/xlsx files may be uploaded');
            this.value = '';
    }
};
*/

$("#uploadFilenameEdit5").on('change keyup paste mouseup', function() {
    $("#myFileName").html($("#uploadFilenameEdit5").val());
    var tx = "http://9e95a79f-43c0-4714-b0a3-aca3b0c6afa7-hosted.cloudcms.net/static/test.pdf?repository=762dfadfb9251fdd8d66&branch=c758483caa8ad40584ff&node=be1d4801be57fd2423db&attachment=";
    $("#lnk1").html(tx + $("#uploadFilenameEdit5").val());
});


function copyToClipboard(element) { 
    var targetId = "_hiddenCopyText_";
    //var isInput = elem.tagName === "INPUT" || elem.tagName === "TEXTAREA";
    var isInput='';
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        target.textContent = element;
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
          succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
}


$(document).ready(function () {

    $('#dialog-modal').dialog({
        modal: true,
        autoOpen: false,
        width:900,
        buttons : {
            "Confirm" : function() {
                var c = $('.container').find("[data-alpaca-container-item-name='bodyImage']").children();
                var d= c[1];
                console.log(d);
               var x = d.children[1];
               var id= x.id;
               var nxt=id.substr(id.length-2,2);
               var ext_img = "alpaca" + (parseInt(nxt)+2);
               console.log(ext_img)
                          
               $("[data-alpaca-container-item-name='bodyImage']").val('text');
               cookieGroup =[];

                  var doc_cookie = document.cookie.split(";");
                  
                  for(var i = 0; i < doc_cookie.length ; i++){

                    var name= doc_cookie[i].split("=")[0].trim();
                    if(name=='image_data')
                         var language_1= doc_cookie[i].split("=")[1];
                    if(name=='selected_image')
                         var location_1= doc_cookie[i].split("=")[1];
                      
                       
                  }

                    $("#"+ x.id).val(location_1);  
                $(this).dialog("close");
             
            },
            "Cancel" : function() {
              $(this).dialog("close");
            } 
        }
    });
});

