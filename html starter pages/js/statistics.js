var myHeaders = new Headers();
myHeaders.append("X-API-Key", "qcDsBCQu7Qa86ZXg8SHhYyZ7Cle03qRQbGFAsFtJ");

var url = 'https://api.propublica.org/congress/v1/116/senate/members.json';
if (document.title.includes("House")) {
    url = 'https://api.propublica.org/congress/v1/116/house/members.json';
}

var myRequest = new Request(url, {
    headers: myHeaders
});

var app = new Vue({
    el: '#app',
    data: {
        members: [],
        statistics: {
            numberDemocrats: [],
            numberRepublicans: [],
            numberIndependent: [],
            averageVotesD: 0,
            averageVotesR: 0,
            averageVotesID: 0,
            tenLowest: [],
            tenHighest: [],
            tenHighestMissed: [],
            tenLowestMissed: [],
        }

    }
})


fetch(myRequest)
    .then(function (response) {
        return response.json();

    })
    .then(function (info) {
        app.members = info.results[0].members
        party()
        getAverage()
        mostEngaged()
        leastEngaged()
        mostLoyal()
        leastLoyal()

        console.log(app.statistics.numberDemocrats)
        console.log(app.statistics.numberRepublicans)
        console.log(app.statistics.numberIndependent)

        console.log(mostEngaged())
        console.log(leastEngaged())
        console.log(mostLoyal())
        console.log(leastLoyal())

        console.log("average votes independents: " + app.statistics.averageVotesID.toString())
        console.log("average votes republicans: " + app.statistics.averageVotesR.toString())
        console.log("average votes democrats: " + app.statistics.averageVotesD.toString())


    })



function getAverage() {
    app.statistics.averageVotesD = votesWithParty(app.statistics.numberDemocrats)
    app.statistics.averageVotesR = votesWithParty(app.statistics.numberRepublicans)
    app.statistics.averageVotesID = votesWithParty(app.statistics.numberIndependent)
}

function leastLoyal() {
    var leastVotes = app.members.sort((a, b) => a.votes_with_party_pct - b.votes_with_party_pct);
    app.statistics.tenLowest = leastVotes.slice(0, Math.round(app.members.length * .10))
    return app.statistics.tenLowest
}


function mostLoyal() {
    var mostVotes = app.members.sort((a, b) => b.votes_with_party_pct - a.votes_with_party_pct);
    app.statistics.tenHighest = mostVotes.slice(0, Math.round(app.members.length * .10))
    return app.statistics.tenHighest
}


function leastEngaged() {
    var mostMissedVotes = app.members.sort((a, b) => b.missed_votes_pct - a.missed_votes_pct);
    app.statistics.tenHighestMissed = mostMissedVotes.slice(0, Math.round(app.members.length * .10))
    return app.statistics.tenHighestMissed
}



function mostEngaged() {
    var leastMissedVotes = app.members.sort((a, b) => a.missed_votes_pct - b.missed_votes_pct);
    app.statistics.tenLowestMissed = leastMissedVotes.slice(0, Math.round(app.members.length * .10))
    return app.statistics.tenLowestMissed
}

function loyalty(property) {
    var loyalty = "";
    for (i = 0; i < property.length; i++) {
        loyalty +=
            `<tr>
                 <td>` + (property[i].first_name + " " + (property[i].middle_name || "") + " " + property[i].last_name) + ` </td>
                 <td>` + property[i].total_votes + `</td>
                 <td>` + "%" + property[i].votes_with_party_pct + `</td>
             
             </tr>`;
    }
    return loyalty;
}


function attendance(property) {
    var attendance = "";
    for (i = 0; i < property.length; i++) {
        attendance +=
            `<tr>
                 <td>` + (property[i].first_name + " " + (property[i].middle_name || "") + " " + property[i].last_name) + ` </td>
                 <td>` + property[i].missed_votes + `</td>
                 <td>` + "%" + property[i].missed_votes_pct + `</td>
             
             </tr>`;
    }
    return attendance
}


function party() {
    for (var i = 0; i < app.members.length; i++) {

        if (app.members[i].party == "ID") {
            app.statistics.numberIndependent.push(app.members[i])
        } else if (app.members[i].party == "R") {
            app.statistics.numberRepublicans.push(app.members[i])
        } else if (app.members[i].party == "D") {
            app.statistics.numberDemocrats.push(app.members[i])
        }
    }
    var info = [app.statistics.numberIndependent, app.statistics.numberRepublicans, app.statistics.numberDemocrats]
    return (info)
}


function votesWithParty(datos) {

    var suma = 0;
    for (i = 0; i < datos.length; i++) {
        suma += (datos[i].votes_with_party_pct || 0)
    }

    return (suma / (datos.length == 0 ? 1 : datos.length))

}

