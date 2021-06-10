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
        members: []
    }
})


fetch(myRequest)
    .then(function (response) {
        return response.json();

    })
    .then(function (info) {
        app.members = info.results[0].members
        
    })


// function table(data) {

//     var getHtml = "";
//     for (i = 0; i < data.results[0].members.length; i++) {
//         getHtml +=
//             `<tr>
//                 <td>` + (data.results[0].members[i].first_name + " " + (data.results[0].members[i].middle_name || "") + " " + data.results[0].members[i].last_name).link(data.results[0].members[i].url) + ` </td>
//                 <td>` + data.results[0].members[i].party + `</td>
//                 <td>` + data.results[0].members[i].state + `</td>
//                 <td>` + data.results[0].members[i].seniority + `</td>
//                 <td>` + "%" + data.results[0].members[i].votes_with_party_pct + `</td>
               
//             </tr>`;
//     }

//     return getHtml;
// }