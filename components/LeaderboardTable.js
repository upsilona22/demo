import MaterialTable from '@material-table/core';
import PlayerHistoryPanel from '@components/PlayerHistoryPanel'
export default function LeaderboardTable({ leaderboard }) {
    //let players = players;

    let players = []
    for (let player in leaderboard) {
        let playerData = leaderboard[player];
        let date = new Date(playerData["LastUpdate"]);
        let dateString = date.toLocaleDateString();
        let playerDemos = parseInt(playerData["Demolitions"]);
        let playerExterms = parseInt(playerData["Exterminations"]);
        let newPlayer = {
            "Nom": playerData["Name"],
            "Démolitions": playerDemos,
            "Exterminations": playerExterms,
            "Dernière MAJ": dateString,
            "Pays": playerData.Country,
            "Historique": playerData.History
        }
        players.push(newPlayer);
    }

    players.sort((a, b) => {
        return b.Démolitions - a.Démolitions;
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
            field: 'Name',
        },
        {
            title: 'Démolitions',
            field: 'Demolitions',
            defaultSort: 'desc',
            render: (data) => {
                return data.Demolitions.toLocaleString();
            }
        },
        {
            title: 'Démolitions Rang',
            field: 'DemolitionsRank',
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
            title: 'Exterminations Rang',
            field: 'ExterminationsRank',
            defaultSort: 'asc'
        },
        {
            title: 'Pays',
            field: 'Country'
        },
        {
            title: 'dernière mise à jour',
            field: 'Last Update',
            defaultSort: 'asc'
        },
    ];

    const options = {
        thirdSortClick: false,
        idSynonym: "Name",
        pageSize: 25,
        pageSizeOptions: [10, 15, 25, 50, 100],
        showTitle: false,
        padding: "dense",
        tableLayout: "auto",
        tableWidth: "fixed",
        emptyRowsWhenPaging: false,
        rowStyle: (data, index, level) => {
            if (index % 2 == 0) {
                return {
                    backgroundColor: "#FFFFFF",
                }
            } else {
                return {
                    backgroundColor: "#F8F8F8",
                }
            }
        },
        headerStyle: {
            backgroundColor: '#F8F8F8',
        },
        detailPanelType: "single",
        columnsButton: true,
        draggable: false,
    };

    return <MaterialTable
        title={"Demolition Leaderboard"}
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
