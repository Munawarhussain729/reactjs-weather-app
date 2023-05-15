import React from 'react'
import GetDailyForcast from './GetDailyForcast';
const CompleteForcast = ({ forcastDetail, NoOfDays }) => {
    const currentDate = new Date().getTime();

    return forcastDetail?.map((item) => {

        let date = new Date(item.ForcastDate).getTime();
        const difference = Math.abs(currentDate - date);
        const days = Math.ceil(difference / (1000 * 60 * 60 * 24));

        if (days <= NoOfDays) {
            return <GetDailyForcast key={item.id} item={item} />;
        }
        return null;
    });
};



export default CompleteForcast