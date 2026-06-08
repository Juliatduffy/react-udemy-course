import SortableTable from '../components/SortableTable';

function TablePage() {

    const data = [
        {name: 'Red', color: 'bg-red-500', score:1},
        {name: 'Orange', color: 'bg-orange-500', score:5},
        {name: 'Yellow', color: 'bg-yellow-500', score:4},
        {name: 'Green', color: 'bg-green-500', score:3},
        {name: 'Blue', color: 'bg-blue-500', score:2},
    ]

    // each object represents a column
    const config = [
        {
            label:"Name",
            render: (fruit) => fruit.name,
            sortValue: (fruit) => fruit.name,
        },
        {
            label:"Color",
            // render allows for optional cell styling
            render: (fruit) => <div className={`p-3 m-2 ${fruit.color}`}>{fruit.color}</div>
        },
        {
            label:"Score",
            //header: () => <div className="bg-pink-500">Score</div>, // optional header styling
            render: (fruit) => fruit.score,
            sortValue: (fruit) => fruit.score,
        },
        {
            label:"Score * 2",
            //header: () => <div className="bg-pink-500">Score</div>, // optional header styling
            render: (fruit) => fruit.score * 2,
            sortValue: (fruit) => fruit.score * 2,
        },
    ]

    const keyFn = (fruit) => {
        return fruit.name;
    }
    return <div><SortableTable data={data} config={config} keyFn={keyFn}/></div>

}
export default TablePage;