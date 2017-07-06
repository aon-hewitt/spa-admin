var repositoryId = "762dfadfb9251fdd8d66";
var branchId = "";
var nodeId = "92cdc4826e9c96b5fd66";
var pages = [];
var navBar = [];
var branch;

var config = {
    "clientKey": "26f9385c-5993-4fdb-b18b-a537e16cc721",
    "clientSecret": "Bi+EneT8H7oVSdFM3/zXilvt+FPDQrZC3RsWQb31OS4psIp/mbbfdnkHFN2GLDl4DFbJt52iQFQoohmdO0cC6TT6qQ/pqWKRM6IqBnemDSo=",
    "username": "0231d383-f2ab-4f22-99a5-31b0a3d5cd93",
    "password": "ecCD8Nwvwq9DsfCvzPA8IWhGgWHibtrBdJgd8i9602Q0q7xJMN21gbSEqUUYaOqHQRZ75jzg/Tt4BNPajKOdIx18a26AXP8RQonmjLmvsWQ=",
    "baseURL": "https://api.cloudcms.com",
    "application": "ae4e45352206df5ebff3"
};

Gitana.connect(config).then(function () {
    this.readRepository(repositoryId).then(function () {
        this.readBranch('master').then(function () {
            branch = this;
            var query = {
                "_type": 'custom:page0'
            };
            var pagination = {
                "sort": {
                    "priority": 1
                },
                "limit": 9999
            };

            this.queryNodes(query, pagination).then(function () {
                totalObjects = this.__size();
                console.log(totalObjects);
            }).each(function () {
                pages.push(this);
            })
        .then(function () {
            sessionStorage.setItem("pages", JSON.stringify(pages));
            //Build the pages each in a seperate section
            for (var i = 0; i < pages.length; i++) {
                var contextPage = pages[i];
                //console.log(contextPage);
                if (pages[i].template == "homePage") {
                    var htmlPages = template(contextPage);
                } else if (pages[i].template == "leftSideBarPage") {
                    var htmlPages = template2(contextPage);
                } else if (pages[i].template == "rightSideBarPage") {
                    var htmlPages = template3(contextPage);
                } else {
                    console.log("ERROR - No comtext specified for page");
                }
                $("#container").append(htmlPages);
            }

            var query = {
                "_type": 'custom:navbar0'
            };
            var pagination = {
                "sort": {
                    "priority": 1
                },
                "limit": 9999
            };

            branch.queryNodes(query, pagination).then(function () {
                totalObjects = this.__size();
                console.log(totalObjects);
            }).each(function () {
                navBar.push(this);
            })
        .then(function () {
            sessionStorage.setItem("navBar", JSON.stringify(navBar));

            var contextNav = JSON.parse(sessionStorage.getItem("navBar"));
            console.log(contextNav);
            var htmlNav = templateNav(contextNav);
            $("#nav").html(htmlNav);
            //Navigate initially to the page with default set to true
            for (var i = 0; i < pages.length; i++) {
                if (pages[i].default == true) {
                    navigate(pages[i].title);
                }
            };
            //End Build Nav Bar
        });
        });
        })
    })
});

var navigate = function (title) {
    var mySubString = title.substring(0, 4);
    if (mySubString == "http") {
        window.location.href = title;
    } else {
        $(".sectionContainer").css("display", "none");
        $("#sectionContainer" + "_" + title).css("display", "block");
        $("li").removeClass("active");
        $("li#" + title + "").addClass("active");
    }
}