import {DatePicker} from "@/components/DatePicker/datepicker.tsx";
import Dropdown from "@/components/Dropdown/dropdown.tsx";
import {useState} from "react";

const ChartFilters = () =>{
    const [fromDate, setFromDate] = useState<Date | undefined>();
    const [toDate, setToDate] = useState<Date | undefined>();

    const busOptions = [{ label: "Bus ID", value: "bus_id" }];

    return(
        <div className="flex space-x-2">
            <DatePicker onDateChange={setFromDate} width="120px"
                        placeholder="From"/>
            <DatePicker onDateChange={setToDate} width="120px" placeholder="To"/>
            <Dropdown options={busOptions} width="120px" placeholder="Bus Id"/>
        </div>
    );
}

export default ChartFilters;