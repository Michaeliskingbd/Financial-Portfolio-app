# Profile App Presentation

## Overview
The Portfolio App is a financial tool designed to help users manage their investment portfolios based on their risk tolerance. The application includes a backend server built with Node.js, Express, and MongoDB, and a frontend developed using React. The app allows users to view their portfolio's asset allocation according to their risk tolerance.

## Development Process

### 1. Backend Setup
- Utilized Node.js, Express, and MongoDB for the backend infrastructure.
- Established a connection to MongoDB Atlas for data storage.

### 2. Data Modeling
- Designed a data structure to represent risk scores and stock values.
- Populated the MongoDB database with sample data for risk scores ranging from 0 to 10.

### 3. Frontend Implementation
- Employed React for a dynamic and responsive user interface.
- Created components to display this as a radar chart and a bar chart

### 4. Data Fetching
- Implemented API routes to retrieve portfolio data based on risk scores.
- Integrated Axios to make asynchronous requests from the frontend to the backend.

### 5. User Interaction
- Enabled users to select a risk score through a slider component.
- Displayed corresponding portfolio data dynamically upon risk score changes.

## Decisions

1. **Technology Stack:**
   - Chose Node.js, Express, and MongoDB for the backend due to their scalability and ease of integration.
   - Selected React for the frontend to create a modern and interactive user experience.

2. **Data Representation:**
   - Opted for radar and bar charts to visually represent risk scores and stock value.
   - Utilized Recharts and Chart.js for efficient chart rendering in React.

## Limitations/Opportunities

**Limitations:**
- **Sample Data:** The current implementation uses static sample data.
- **Simplified Risk Assessment:** The risk score calculation is simplified and may not fully capture the complexity of real-world financial risk assessment.

**Opportunities:**
- **User Authentication:** Implement user authentication to provide personalized portfolio management features.
- **Dynamic Data:** Integrate real-time financial data APIs to provide up-to-date market information.
- **Enhanced Risk Assessment:** Explore advanced risk assessment models for a more accurate representation of investment risk.

## Conclusion

The Portfolio App provides a foundation for users to understand and manage their investment portfolios. Future enhancements can elevate the app by incorporating real-time data and advanced risk assessment models, making it a valuable tool for investors seeking a comprehensive financial management experience.
