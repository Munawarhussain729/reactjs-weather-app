import React from 'react';

const GetForcastRow = (item) => {
    const dateString = item.item.ForcastDate;
    const timeString = dateString.split(" ")[1];
    const hourMinute = timeString.split(":").slice(0, 2).join(":");
    console.log("Items ", item)
    return (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
                {hourMinute}
            </th>
            <td className="px-6 py-4">{item.item.Temperature}</td>
            <td className="px-6 py-4">{item.item.Cloudy}</td>
            <td className="px-6 py-4">{item.item.Wind}</td>
            <td className="px-6 py-4">{item.item.Humaidity}</td>
            <td className="px-6 py-4">{item.item.Pressure}</td>
        </tr>
    );
};

const GetDailyForcast = ({ items }) => {
    return (
        <div className="relative overflow-x-auto rounded w-500 shadow-xl m-10 p-5 border bg-gradient-to-r from-cyan to-gray">
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
                    {items.map((item) => (
                        <GetForcastRow key={item.id} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetDailyForcast;
