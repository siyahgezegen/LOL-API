document.querySelector("#buttons").addEventListener("click", getApi);
var jsonChamp = "/jsons.json";
var api = "?api_key=RGAPI-f6a014d4-e878-4d53-b298-b25685442cc9";
var chmpids = "";

var input = document.getElementById("tst");
input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("buttons").click();
  }
});

function getApi() {
    var sumname = "" + document.getElementById("tst").value;
    var sumId = "";
    var listofChmpSc = [];
    const outs = "";



    fetch("https://tr1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + sumname + api)
        .then(function (response) {
            return response.json();
        }).then(function (playerst) {
            sumId = playerst.id;
            console.log(playerst);

            document.getElementById('imgs').src = "https://ddragon.leagueoflegends.com/cdn/12.17.1/img/profileicon/" + playerst.profileIconId + ".png";
            document.getElementById('imgs').width = 100;
            document.getElementById('imgs').height = 100;
            let output = "<ul class='list-group'>";

            output += "<li class='list-group-item'>Sihirdar Adı : " + playerst.name + "</li>";
            output += "<li class='list-group-item'>Sihirdar   Leveli : " + playerst.summonerLevel + "</li>";
            output += "</ul>";
            document.getElementById("output").innerHTML = output;
            fetch("https://tr1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/" + sumId + api)
                .then(function (response) {
                    return response.json();
                }).then(function (sumbilgi) {
                    document.getElementById("encokp").innerText = "En Çok Oynanan Şampiyonlar";
                    sumbilgi.forEach((element, index) => {
                        if (index < 3) {
                            let puanchmp = element.championPoints;
                            let outs = "<div class='container'><div class='row'><div class='col-md-8'><ul class='list-group'>"
                            outs += "<li class='list-group-item'>Puan : " + puanchmp + "</li>";
                            let lvlchmp = element.championId;

                            fetch("jsons.json").then(function (response) {
                                return response.json();
                            }).then(function (response) {
                                response.forEach(element => {
                                    if (lvlchmp == element.key) {
                                        //console.log(element.id+" "+element.key)
                                        outs += "<li class='list-group-item'> Şampiyon : " + UpperKelime(element.id) + "</li>";
                                        outs += "<img class='img-thumbnail' width='80' height='80' src='http://ddragon.leagueoflegends.com/cdn/12.17.1/img/champion/" + UpperKelime(element.id) + ".png'></div></div></div></br>"
                                        document.getElementById("encokoynanan").innerHTML += outs;
                                    }
                                })
                            })
                        }
                    });
                    //console.log(listofChmpSc);
                })
        }).catch(function (err) {
            console.log("hata");
        })
    function ligbilgi() {
        fetch("https://tr1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + sumId + api)
            .then(function (response) {
                return response.json();
            }).then(function (response) {
                console.log(response[1]);
                if (response[1] !== undefined) {
                    let libilgi = "<ul class='list-group'><li class='list-group-item'>Lig : " + response[1].tier + " " + response[1].rank + "\n</li><li class='list-group-item'>Win : " + response[1].wins + "</li>\n<li class='list-group-item'>Lose : " + response[1].losses + "</li></ul>";
                    document.getElementById("ligbilgi").innerHTML = libilgi;
                }
                else (
                    document.getElementById("ligbilgi").innerHTML = null
                )

            })
    }
    setTimeout(ligbilgi, 1000);

}
function UpperKelime(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}