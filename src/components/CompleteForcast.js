import React from 'react';
import GetDailyForcast from './GetDailyForcast';

const CompleteForcast = ({ forcastDetail, NoOfDays }) => {
    const currentDate = new Date().getTime();
    // Group items based on date
    const groupedForcast = forcastDetail.reduce((result, item) => {
        const date = new Date(item.ForcastDate);
        const dateString = date.toDateString();
        if (!result[dateString]) {
            result[dateString] = [];
        }
        result[dateString].push(item);
        return result;
    }, {});

    return Object.keys(groupedForcast).map((dateString) => {
        const date = new Date(dateString).getTime();
        const difference = Math.abs(currentDate - date);
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        if (days < NoOfDays) {
            const items = groupedForcast[dateString];

            return (
                <div key={dateString}>
                    <h2>{dateString}</h2>
                    <GetDailyForcast items={items} />
                </div>
            );
        }
        return null;
    });
};

export default CompleteForcast;
