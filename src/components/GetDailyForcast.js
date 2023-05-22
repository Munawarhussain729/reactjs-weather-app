import React from 'react';

const GetForcastRow = (item) => {
    const date = new Date(item.item.ForcastDate);
    const hourMinute = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

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
            <td className="px-6 py-4">{item.item.Humidity}</td>
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
                            Humidity
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Pressure
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <GetForcastRow key={JSON.stringify(item)} item={item} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default GetDailyForcast;
