export const gradients = {
    indigo: ['#dcd6ff', '#b8adff', '#9285ff', '#7766ff', '#4833ff', '#3525db', '#261ab1', '#1a1093', '#10097a',],
    green: ['#dcfdc3', '#affc9d', '#7cf86c', '#4bf246', '#0cea1c', '#0dc928', '#0ca82f', '#038731', '#047031',],
    blue: ['#233876', '#1E429F', '#1A56DB', '#1C64F2', '#3F83F8', '#76A9FA', '#A4CAFE', '#C3DDFD', '#EBF5FF',],
    yellow: ['#fff8db', '#fff0b8', '#ffe495', '#ffd97b', '#ffc84f', '#dba339', '#b78127', '#936118', '#7a4b10',],
    pink: ['#ffd8f2', '#ffb1ea', '#ff8aea', '#ff6df1', '#ff3dfe', '#cd2ddb', '#9d1fb7', '#731493', '#540b7a',],
}

const NUM_OF_MOODS = 6

export const baseRating = {}

for (let i = 0; i < 44; i++) {
    baseRating[i] = (i % NUM_OF_MOODS) + 1; // Cycle numbers from 1 - 6
}

// Demo data
export const demoData = {
    "15": 2, "16": 4, "17": 1, "18": 3, "19": 5, "20": 6, 
    "21": 2, "22": 4, "23": 1, "24": 3, "25": 5, "26": 6, 
}