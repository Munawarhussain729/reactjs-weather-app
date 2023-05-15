import React from 'react'

const GetForcastRow = (item) => {
    const dateString = item.ForcastDate;
    const timeString = dateString.split(" ")[1];
    const hourMinute = timeString.split(":").slice(0, 2).join(":");

    return (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            {hourMinute}
        </th>
        <td className="px-6 py-4">
            {item.Temperature}
        </td>
        <td className="px-6 py-4">
            {item.Cloudy}
        </td>
        <td className="px-6 py-4">
            {item.Wind}
        </td>
        <td className="px-6 py-4">
            {item.Humaidity}
        </td>
        <td className="px-6 py-4">
            {item.Pressure}
        </td>
    </tr>)
}

const GetDailyForcast = ({ item }) => {
    const date = new Date(item.ForcastDate);
    const formattedDate = date.toDateString();
    return (
        <div className="relative overflow-x-auto">
            <h1>Forcast For {formattedDate} </h1>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Temperature
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Cloudy
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Wind
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Humaidity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pressure
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {GetForcastRow(item)}
                </tbody>
            </table>
        </div>
    )
}


export default GetDailyForcast