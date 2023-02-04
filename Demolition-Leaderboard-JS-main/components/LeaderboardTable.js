import MaterialTable from '@material-table/core';
import PlayerHistoryPanel from '@components/PlayerHistoryPanel'
export default function LeaderboardTable({ leaderboard }) {
    //let players = players;

    let players = []
    for (let player in leaderboard) {
        let playerData = leaderboard[player];
        let date = new Date(playerData["Dernière mise à jour"]);
        let dateString = date.toLocaleDateString();
        let playerDemos = parseInt(playerData["Demolitions"]);
        let playerExterms = parseInt(playerData["Exterminations"]);
        let newPlayer = {
            "Nom": playerData["Name"],
            "Demolitions": playerDemos,
            "Exterminations": playerExterms,
            "Dernière mise à jour": dateString,
            "Pays": playerData.Country,
            "Historique": playerData.History
        }
        players.push(newPlayer);
    }

    players.sort((a, b) => {
        return b.Demolitions - a.Demolitions;
    })

    let i = 1;
    for (let player in players) {
        players[player].DemolitionsRank = i;
        i++;
    }

    players.sort((a, b) => {
        return b.Exterminations - a.Exterminations;
    })
    i = 1;
    for (let player in players) {
        players[player].ExterminationsRank = i;
        i++;
    }

    let columns = [
        {
            title: 'Nom',
            field: 'Nom',
        },
        {
            title: 'Démolitions',
            field: 'Démolitions',
            defaultSort: 'desc',
            render: (data) => {
                return data.Demolitions.toLocaleString();
            }
        },
        {
            title: 'Rang démolitions',
            field: 'Rang démolitions',
            defaultSort: 'asc'
        },
        {
            title: 'Exterminations',
            field: 'Exterminations',
            defaultSort: 'desc',
            render: (data) => {
                return data.Exterminations.toLocaleString();
            }
        },
        {
            title: 'Rang exterminations',
            field: 'Rang exterminations',
            defaultSort: 'asc'
        },
        {
            title: 'Pays',
            field: 'Pays'
        },
        {
            title: 'Dernière mise à jour',
            field: 'Dernière mise à jour',
            defaultSort: 'asc'
        },
    ];

    const options = {
        thirdSortClick: false,
        idSynonym: "Nom",
        pageSize: 50,
        pageSizeOptions: [10, 15, 25, 50, 100],
        showTitle: false,
        padding: "dense",
        tableLayout: "auto",
        tableWidth: "fixed",
        emptyRowsWhenPaging: false,
        rowStyle: (data, index, level) => {
            if (index % 2 == 0) {
                return {
                    backgroundColor: "#fffff",
                }
            } else {
                return {
                    backgroundColor: "#e8e8e8",
                }
            }
        },
        headerStyle: {
            backgroundColor: '#e8e8e8',
        },
        detailPanelType: "single",
        columnsButton: true,
        draggable: false,
    };

    return <MaterialTable
        title={"Classement des démolitions francophones"}
        data={players}
        columns={columns}
        options={options}
        detailPanel={({rowData}) => {
            return PlayerHistoryPanel({rowData});
        }}
        onRowClick={(event, rowData, toggleDetailPanel) => {
            toggleDetailPanel();
        }}
    />
}
