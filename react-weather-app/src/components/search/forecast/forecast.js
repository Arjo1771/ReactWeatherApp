import React from 'react';
import { Accordion, AccordionItem, AccordionItemButton, AccordionItemHeading, AccordionItemPanel } from 'react-accessible-accordion';
import './forecast.css';


const WEEK_DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


const Forecast = ({ data }) => {
    const dayInWeek = new Date().getDay();
    const forecastDays = WEEK_DAYS.slice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInWeek));


    return (
    <>
        <label className="title">Daily Forecast</label>
        <Accordion allowZeroExpanded>
            {data.list.slice(0, 7).map((item, idx) => (
                <AccordionItem key={idx}>
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            <div className="daily-item">
                                <img alt="weather" className="icon-small" src={`icons/${item.weather[0].icon}.png`} />
                                <label className="day">{forecastDays[idx]}</label>
                                <label className="description">{item.weather[0].description}</label>
                                <label className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C </label>
                            </div>
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="daily-details-grid">
                            <div className="daily-details-grid-item">
                                <label>Humidity</label>
                                <label>{item.main.humidity}%</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Wind</label>
                                <label>{item.wind.speed} m/s</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Pressure</label>
                                <label>{item.main.pressure} hPa</label>
                            </div>
                            <div className="daily-details-grid-item">
                                <label>Rain</label>
                                <label>{item.rain ? `${item.rain['3h']} mm` : '0mm'}</label>
                            </div>
                            
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
            ))}



        </Accordion>
    </>
    )
}

export default Forecast;