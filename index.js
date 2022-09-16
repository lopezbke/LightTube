PetiteVue.createApp({
    searchInput: '',
    inVideo: false,
    inSettings: false,
    inHistory: false,
    inRequestKey: false,
    videoHistory: [],
    key: undefined,
    currentVideo: "",
    searchResults: [],
    search: function () {
        if(this.isKeyAvailable()) {
            let url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=' + this.searchInput + '&type=video&key=' + this.key;
            fetch(url)
                .then(response => response.json())
                .then(data => {this.searchResults = data; console.log(this.searchResults)});
        } 
    },
    goToSettings: function () {
        if(this.isKeyAvailable()) {
            this.inVideo = false;
            this.inSettings = true;
            this.inHistory = false;
            this.inRequestKey = false;
        }
    },
    goToHistory: function () {
        if(this.isKeyAvailable()) {
            this.inVideo = false;
            this.inSettings = false;
            this.inHistory = true;
            this.inRequestKey = false;
        }
    },
    isKeyAvailable: function() {
        const key = localStorage.getItem("lightTubeKey");
        if(key) 
        {
            this.key = key;
            return true;
        } else {
            this.goToRequestKey();
            return false;
        }
    },
    goToRequestKey: function () {
        this.inVideo = false;
        this.inSettings = false;
        this.inHistory = false;
        this.inRequestKey = true;
    },
    onMounted: function (element) {
        if(this.isKeyAvailable()) {
            this.SetTheme();
            const history = localStorage.getItem("LightTubeVideoHistory");
            var historyArray = [];
            if(history) 
            {
                historyArray = JSON.parse(history);
                this.videoHistory = historyArray;
            } 
        }
    },
    AddVideoToHistory: function (item) {
        
        console.log("here:");
        console.log(item);
        const history = localStorage.getItem("LightTubeVideoHistory");
        var historyArray = [];
        if(history) 
        {
            historyArray = JSON.parse(history);
            historyArray.push(item);
        } else {
            historyArray.push(item);
        }
        localStorage.setItem("LightTubeVideoHistory",JSON.stringify(historyArray));
        this.videoHistory = historyArray;
    },
    SaveKeyInLocal: function () {
        if(document.getElementById("apiKeyInput").textContent.length > 5) 
        {
            localStorage.setItem("lightTubeKey",this.key);
        }  
    },
    SaveSettings: function () {
        const darkModeCheckbox = document.getElementById("darkModeChk").checked;
        if(darkModeCheckbox) {
            localStorage.setItem("DarkMode","Yes");
            console.log("dark mode checked");
        } else {
            localStorage.removeItem("DarkMode");
            console.log("dark mode unchecked");
        } 
        this.SetTheme();
    },
    SetTheme: function () {
        const isDarkMode = localStorage.getItem("DarkMode");
        if(isDarkMode) {
            document.querySelector("#content").style.backgroundColor = "#181818";
            document.querySelector("#navigation").style.backgroundColor = "#232323";
            document.querySelector("#navigation").style.color = "white";
            document.getElementById("labelDarkModeChk").style.color = "white";
            document.getElementById("settingsHeader").style.color = "white";
            document.getElementById("historyHeader").style.color = "white";
            document.getElementById("darkModeChk").checked = "true";
            console.log("Dark mode Set");
        }
        else
        {
            document.querySelector("#content").style.backgroundColor = "white";
            document.querySelector("#navigation").style.backgroundColor = "white";
            document.querySelector("#navigation").style.color = "black"; 
            document.getElementById("labelDarkModeChk").style.color = "black";
            document.getElementById("settingsHeader").style.color = "black";
            document.getElementById("historyHeader").style.color = "black";
            document.getElementById("darkModeChk").removeAttribute("checked")
            console.log("Light mode Set");
        }
    },
}).mount()