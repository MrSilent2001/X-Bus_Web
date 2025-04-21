export const dateFilter = (
    filter: "Today" | "Yesterday" | "This Week" | "Last Week" | "This Month" | "Last Month" | "All"
): { startDate?: Date; endDate?: Date } => {
    const now = new Date();
    let startDate: Date | undefined;
    let endDate: Date | undefined;

    switch (filter) {
        case "Today": {
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            startDate = today;
            endDate = new Date(today);
            endDate.setDate(endDate.getDate() + 1);
            break;
        }
        case "Yesterday": {
            startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            break;
        }
        case "This Week": {
            const day = now.getDay();
            const diff = now.getDate() - day + (day === 0 ? -6 : 1);
            startDate = new Date(now.getFullYear(), now.getMonth(), diff);
            endDate = new Date(startDate);
            endDate.setDate(startDate.getDate() + 7);
            break;
        }
        case "Last Week": {
            const day = now.getDay();
            const diffToMonday = day === 0 ? -6 : 1 - day;
            const thisMonday = new Date(now.getFullYear(), now.getMonth(), now.getDate() + diffToMonday);
            startDate = new Date(thisMonday);
            startDate.setDate(thisMonday.getDate() - 7);
            endDate = new Date(thisMonday);
            break;
        }
        case "This Month": {
            startDate = new Date(now.getFullYear(), now.getMonth(), 1);
            endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            break;
        }
        case "Last Month": {
            startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
            endDate = new Date(now.getFullYear(), now.getMonth(), 1);
            break;
        }
        case "All":
        default:
            startDate = undefined;
            endDate = undefined;
    }

    return { startDate, endDate };
};
