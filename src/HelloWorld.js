/*

Princess Yachts template for the following tabs; Summary, Facebook, Google Analytics

 */

 // Import the necessary dependencies

import React, { useEffect, useState, useContext } from 'react';
import { Space, ComponentsProvider, Text, Card,theme, CardContent, Heading, Tabs2, Tab2, FieldDateRange, Field, SpaceVertical, InputDateRange } from '@looker/components';
import { ExtensionContext40 } from '@looker/extension-sdk-react';
import { Query, Visualization } from '@looker/visualizations';
import { DataProvider } from '@looker/components-data';
import { Functions } from '@styled-icons/material';

// Creating the HelloWorld component and making it available for imports in other parts of the Looker Application

export const HelloWorld = () => {
  const { coreSDK } = useContext(ExtensionContext40);

  // Initializing the date range and managing the state with the useState hook

  const [dateRange, setDateRange]=useState({
    from: new Date('2023-10-01'),
    to: new Date('2023-10-31')
  });

  // Creating a formatDate function to convert a Date object to 'YYYY/MM/DD' format

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, '0');
  
    return `${year}/${month}/${day}`;
  };
  
  // Apply the formatDate function to the dateRange state
  const formattedDateRange = {
    from: formatDate(dateRange.from),
    to: formatDate(dateRange.to)
  };
  
  // Creating the date filter string for the API Call
  const dateFilterString = `${formattedDateRange.from} to ${formattedDateRange.to}`;

  // Initialize multiple variables for the Query slugs that will be parsed from the JSON responses of the API calls

  const [currentQueriedSlug, setCurrentQueriedSlug] = useState("");
  const [googleanalyticsQueriedSlug, setGoogleAnalyticsCurrentQueriedSlug] = useState("");
  const [metaQueriedSlug, setMetaCurrentQueriedSlug] = useState("");
  const [googleanalyticsTotalCostQuerySlug, setGoogleanalyticsTotalCostQuerySlug] = useState("");
  const [googleanalyticsTotalImpressionsQuerySlug, setGoogleanalyticsTotalImpressionsQuerySlug] = useState("");
  const [googleanalyticsTotalClicksQuerySlug, setGoogleanalyticsTotalClicksQuerySlug] = useState("");
  const [googleanalyticsTotalReachQuerySlug, setGoogleanalyticsTotalReachQuerySlug] = useState("");
  const [googleanalyticsTotalSessionsQuerySlug, setGoogleanalyticsTotalSessionsQuerySlug] = useState("");
  const [googleanalyticsTotalUsersQuerySlug, setGoogleanalyticsTotalUsersQuerySlug] = useState("");
  const [googleanalyticsTotalNewUsersQuerySlug, setGoogleanalyticsTotalNewUsersQuerySlug] = useState("");
  const [googleanalyticsBounceRateQuerySlug, setGoogleanalyticsBounceRateQuerySlug] = useState("");
  const [googleanalyticsSessionsPerUserQuerySlug, setGoogleanalyticsSessionsPerUserQuerySlug] = useState("");
  const [googleanalyticsSessionsLineQuerySlug, setGoogleanalyticsSessionsLineQuerySlug] = useState("");
  const [googleanalyticsSessionsChannelGridQuerySlug, setGoogleanalyticsSessionsChannelGridQuerySlug] = useState("");
  const [googleanalyticsSessionsSourcePieQuerySlug, setGoogleanalyticsSessionsSourcePieQuerySlug] = useState("");
  const [metaMediaCostSingleQuerySlug, setMetaMediaCostSingleQuerySlug] = useState("");
  const [metaImpressionsSingleQuerySlug, setMetaImpressionsSingleQuerySlug] = useState("");
  const [metaClicksSingleQuerySlug, setMetaClicksSingleQuerySlug] = useState("");
  const [metaReachSingleQuerySlug, setMetaReachSingleQuerySlug] = useState("");
  const [metaSummaryGridQuerySlug, setMetaSummaryGridQuerySlug] = useState("");
  const [metaCampaignSummaryGridQuerySlug, setMetaCampaignSummaryGridQuerySlug] = useState("");
  const [metaAdSummaryGridQuerySlug, setMetaAdSummaryGridQuerySlug] = useState("");
  const [metaCampaignAdSummaryGridQuerySlug, setMetaCampaignAdSummaryGridQuerySlug] = useState("");

  // Define common variables that will be used in the query calls:
  // Model & Account id  declaration
  const modelName = "vccp_test_db_v2";
  const gaprincessyachtId = "50018346";
  const gapropertyId = "google_analytics_all_accounts_custom_report_2.property_id";
  const metapropertyId = "facebook_ads_all_accounts";
  const metaprincessyachtId = "1301358796712953";
  

  // View declarations
  const gaviewName = "google_analytics_all_accounts_custom_report_2";
  const metaviewName = "facebook_ads_all_accounts";


  // GA Date & Static Field Declarations
  const gaDate = "google_analytics_all_accounts_custom_report_2.date_date"; 
  const gaadContent = "google_analytics_all_accounts_custom_report_2.ad_content";
  const gaCampaign = "google_analytics_all_accounts_custom_report_2.campaign";
  const gaChannelgrouping = "google_analytics_all_accounts_custom_report_2.channel_grouping";
  const gaDevicecategory = "google_analytics_all_accounts_custom_report_2.device_category";
  const gaType = "google_analytics_all_accounts_custom_report_2.ga_type";
  const gaSourcemedium = "google_analytics_all_accounts_custom_report_2.source_medium";
  const gaDirectNone = "(direct) / (none)";
  const gaGoogleOrganic = "google / organic";
  const gaBingOrganic = "bing / organic";
  const gaReferral = "securelogin.hpe.com / referral";


  // GA Dynamic Field Declarations
  const sumofUsersfieldga = "sum_of_users";
  
  const sumofUsersdynamicstringga = JSON.stringify([{
      "measure": sumofUsersfieldga,
      "based_on": "google_analytics_all_accounts_custom_report_2.users",
      "type": "sum",
      "label": "Sum of Users"
    }]);

  const sumofPageviewsga = "sum_of_pageviews";
  
  const sumofPageviewsdynamicstringga = JSON.stringify([{
    "measure": sumofPageviewsga,
    "based_on": "google_analytics_all_accounts_custom_report_2.pageviews",
    "type": "sum",
    "label": "Sum of Pageviews"
  }]);

  const sumofSessionsga = "sum_of_sessions";

  const sumofSessionsdynamicstringga = JSON.stringify([{
    "measure": sumofSessionsga,
    "based_on": "google_analytics_all_accounts_custom_report_2.sessions",
    "type": "sum",
    "label": "Sum of Sessions"
  }]);

  const sumofTotalrevenuega = "sum_of_total_revenue"

  const sumofTotalrevenuedynamicstringga = JSON.stringify([{
    "measure": sumofTotalrevenuega,
    "based_on": "google_analytics_all_accounts_custom_report_2.total_revenue",
    "type": "sum",
    "label": "Sum of Total Revenue"
  }]);

  const sumofTransactionsga = "sum_of_transactions";

  const sumofTransactionsdynamicstringga = JSON.stringify([{
    "measure": sumofTransactionsga,
    "based_on": "google_analytics_all_accounts_custom_report_2.transactions",
    "type": "sum",
    "label": "Sum of Transactions"
  }]);

  const sumofNewUsersga = "sum_of_new_users";

  const sumofNewUsersdynamicstringga = JSON.stringify([{
    "measure": sumofNewUsersga,
    "based_on": "google_analytics_all_accounts_custom_report_2.new_users",
    "type": "sum",
    "label": "Sum of New Users"
  }])

  const avgBounceRatega = "average_of_bounces";

  const avgBounceRatedynamicstringga = JSON.stringify([{
    "measure": avgBounceRatega,
    "based_on": "google_analytics_all_accounts_custom_report_2.bounces",
    "type": "average",
    "label": "Average of Bounces"
  }])

  const SessionPerUserGA = "sessions_per_user";

  const tableCalculationSessionsPerUser = JSON.stringify([
    {
      "table_calculation_name": "sessions_per_user",
      "label": "Sessions / Users",
      "expression": "${sum_of_sessions} / ${sum_of_users}",
      "value_format": null, // You can specify a format here if needed
      "value_format_name": "Default formatting"
    }
  ]);
  

  // Meta Date & Static Field Declarations
  const metaDate = "facebook_ads_all_accounts.date_date";
  const metaAccountname = "facebook_ads_all_accounts.account_name";
  const metaAdname = "facebook_ads_all_accounts.ad_name";
  const metaCampaignname = "facebook_ads_all_accounts.campaign_name";
  const metaAdsetname = "facebook_ads_all_accounts.adset_name";
  const metaAdid = "facebook_ads_all_accounts.ad_id";
  const metaAdsetid = "facebook_ads_all_accounts.adset_id";
  const metaCampaignid = "facebook_ads_all_accounts.campaign_id";
  const metaMonth = "facebook_ads_all_accounts.date_month";

  // Meta Dynamic Field Declarations

  const sumofClicksfieldmeta = "sum_of_clicks";

  const sumofClicksdynamicstringmeta = JSON.stringify([{
    "measure": sumofClicksfieldmeta,
    "based_on": "facebook_ads_all_accounts.clicks",
    "type": "sum",
    "label": "Sum of Clicks"
  }]);

  const sumofImpressionsfieldmeta = "sum_of_impressions";

  const sumofImpressionsdynamicstringmeta = JSON.stringify([{
    "measure": sumofImpressionsfieldmeta,
    "based_on": "facebook_ads_all_accounts.impressions",
    "type": "sum",
    "label": "Sum of Impressions"
  }]);

  const sumofReachfieldmeta = "sum_of_reach";

  const sumofReachdynamicstringmeta = JSON.stringify([{
    "measure": sumofReachfieldmeta,
    "based_on": "facebook_ads_all_accounts.reach",
    "type": "sum",
    "label": "Sum of Reach"
  }]);

  const sumofSpendmeta  = "sum_of_spend";

  const sumofSpenddynamicstringmeta = JSON.stringify([{
    "measure": sumofSpendmeta,
    "based_on": "facebook_ads_all_accounts.spend",
    "type": "sum",
    "label": "Sum of Spend"
  }]);

  const sumOfPostEngagementmeta = "sum_of_post_engagement_unique_inline";

  const sumofPostengagementdynamicstringmeta = JSON.stringify([{
    "measure": sumOfPostEngagementmeta,
    "based_on": "facebook_ads_all_accounts.post_engagement_unique_inline",
    "type": "sum",
    "label": "Sum of Post Engagement Unique Inline"
  }]);

  const sumOfVideoViewsmeta = "sum_of_video_view_value";

  const sumofVideowviewsdynamicstringmeta = JSON.stringify([{
    "measure": sumOfPostEngagementmeta,
    "based_on": "facebook_ads_all_accounts.video_view_value",
    "type": "sum",
    "label": "Sum of Video View Value"
  }]);
  
  const dynamicFieldsMetaSummary = JSON.stringify([
    {
      measure: "sum_of_spend",
      based_on: "facebook_ads_all_accounts.spend",
      type: "sum",
      label: "Sum of Spend"
    },
    {
      measure: "sum_of_reach",
      based_on: "facebook_ads_all_accounts.reach",
      type: "sum",
      label: "Sum of Reach"
    },
    {
      measure: "sum_of_clicks",
      based_on: "facebook_ads_all_accounts.clicks",
      type: "sum",
      label: "Sum of Clicks"
    },
    {
      measure: "sum_of_impressions",
      based_on: "facebook_ads_all_accounts.impressions",
      type: "sum",
      label: "Sum of Impressions"
    },
    {
      measure: "sum_of_post_engagement_unique_inline",
      based_on: "facebook_ads_all_accounts.post_engagement_unique_inline",
      type: "sum",
      label: "Sum of Post Engagement Unique Inline"
    },
    {
      measure: "sum_of_video_view_value",
      based_on: "facebook_ads_all_accounts.video_view_value",
      type: "sum",
      label: "Sum of Video View Value"
    },
    // ... add other dynamic fields in similar manner
  ]);


  // Visualisation Configurations 

  // Define variables for visualisation configuration

  const visArea = "looker_area";
  const visColumn = "looker_column";
  const visGrid = "looker_grid";
  const visBar = "looker_bar";
  const visScatter = "looker_scatter";
  const visLine = "looker_line";
  const visPie = "looker_pie";
  const visMap = "looker_google_map";
  const visFunnel = "looker_funnel";
  const visSingle = "single_value";

// Google Analytics API Call Functions

// Total Users API Call Function

const GAUsersSingleAPICall = () => {
  // Create the API request body for the query that needs to run
  const requestBodyGAUsers = {
    model: modelName, // Ensure the correct model name is referenced
    view: gaviewName,
    fields: [
      sumofUsersfieldga
    ],
    filters: {gaDate: dateFilterString,
    gapropertyId: gaprincessyachtId},
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofUsersdynamicstringga

  };

  // Functionality to run the API Call

  coreSDK.ok(coreSDK.create_query(requestBodyGAUsers))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Additional logic to handle the response
    // Extract the slug that will be used as a query constant 
    const GAUsersSingleAPIQuerySlug = response.slug; 
    setGoogleanalyticsTotalUsersQuerySlug(GAUsersSingleAPIQuerySlug);

  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });


};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GAUsersSingleAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change

    
// Total Sessions API Call Function

const GASessionsSingleAPICall = () => {
  // Create the API request body for the query that needs to run
  const requestBodyGASessions = {
    model: modelName, // Ensure the correct model name is referenced
    view: gaviewName,
    fields: [
      sumofSessionsga
    ],
    filters: {gaDate: dateFilterString,
    gapropertyId: gaprincessyachtId},
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofSessionsdynamicstringga

  };

    // Functionality to run the API Call

    coreSDK.ok(coreSDK.create_query(requestBodyGASessions))
    .then(response => {
      console.log("API Call Successful. Response:", response);
      // Additional logic to handle the response
      // Extract the slug that will be used as a query constant 
      const GASessionsSingleAPIQuerySlug = response.slug; 
      setGoogleanalyticsTotalSessionsQuerySlug(GASessionsSingleAPIQuerySlug);
  
    })
    .catch(error => {
      console.error("API Call Failed. Error:", error);
    });

};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GASessionsSingleAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change


// Total New Users API Call Function

const GANewUsersSingleAPICall = () => {
  // Create the API request body for the query that needs to run
  const requestBodyGANewUsers = {
    model: modelName, // Ensure the correct model name is referenced
    view: gaviewName,
    fields: [
      sumofNewUsersga
    ],
    filters: {gaDate: dateFilterString,
    gapropertyId: gaprincessyachtId},
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofNewUsersdynamicstringga

  };

  // Functionality to run the API Call

  coreSDK.ok(coreSDK.create_query(requestBodyGANewUsers))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Additional logic to handle the response
    // Extract the slug that will be used as a query constant 
    const GANewUsersSingleAPIQuerySlug = response.slug; 
    setGoogleanalyticsTotalNewUsersQuerySlug(GANewUsersSingleAPIQuerySlug);

  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });

};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GANewUsersSingleAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change


// Average Bounce Rate API Call Function

const GABounceRateSingleAPICall = () => {
  // Create the API request body for the query that needs to run
  const requestBodyGABounceRate = {
    model: modelName, // Ensure the correct model name is referenced
    view: gaviewName,
    fields: [
      avgBounceRatega
    ],
    filters: {gaDate: dateFilterString,
    gapropertyId: gaprincessyachtId},
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: avgBounceRatedynamicstringga

  };

  coreSDK.ok(coreSDK.create_query(requestBodyGABounceRate))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Additional logic to handle the response
    // Extract the slug that will be used as a query constant 
    const GABounceRateSingleAPIQuerySlug = response.slug; 
    setGoogleanalyticsBounceRateQuerySlug(GABounceRateSingleAPIQuerySlug);

  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });

};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GABounceRateSingleAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change

// Sessions Per User API Call Function

const GASessionsPerUserSingleAPICall = () => {
  // Prepare the request body which includes the table calculation done at run time 
  const requestbodyGASessionPerUser = {
    model : modelName,
    view : gaviewName,
    fields: [
      SessionPerUserGA
    ],
    filters : {
      gaDate : dateFilterString,
      gapropertyId : gaprincessyachtId
    },
    vis_config : {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields : tableCalculationSessionsPerUser

  };

  coreSDK.ok(coreSDK.create_query(requestbodyGASessionPerUser))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Additional logic to handle the response
    // Extract the slug that will be used as a query constant 
    const GASessionsPerUserSingleAPIQuerySlug = response.slug; 
    setGoogleanalyticsSessionsPerUserQuerySlug(GASessionsPerUserSingleAPIQuerySlug);

  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });


};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GASessionsPerUserSingleAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change

// GASessionsLine API Call Function

const GASessionsLineAPICall = () => {
  // Create the API request body for the query that needs to run
  const requestBodyGASessionsLine = {
    model: modelName, // Ensure the correct model name is referenced
    view: gaviewName,
    fields: [
      gaDate,
      sumofSessionsga
    ],
    filters: {
      gaDate: dateFilterString,
      gapropertyId: gaprincessyachtId
    },
    vis_config: {
      "type": visLine,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofSessionsdynamicstringga
    
  };

  // Functionality to run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyGASessionsLine))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Additional logic to handle the response
    // Extract the slug that will be used as a query constant 
    const GASessionsLineAPIQuerySlug = response.slug; 
    setGoogleanalyticsSessionsLineQuerySlug(GASessionsLineAPIQuerySlug); // Update the state with the new slug
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GASessionsLineAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change


// GASessionsChannelGrid API Call Function
const GASessionsChannelGridAPICall = () => {
  // Create the API request body for the query that needs to run
  const requestBodyGASessionsChannelGrid = {
    model: modelName,
    view: gaviewName,
    fields: [
      gaChannelgrouping,
      sumofSessionsga
    ],
    filters: {
      gaDate: dateFilterString,
      gapropertyId: gaprincessyachtId
    },
    vis_config: {
      "type": visGrid,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofSessionsdynamicstringga
  };

  // Functionality to run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyGASessionsChannelGrid))
    .then(response => {
      console.log("API Call Successful. Response:", response);
      // Additional logic to handle the response
      // Extract the slug that will be used as a query constant
      const GASessionsChannelGridAPIQuerySlug = response.slug; 
      setGoogleanalyticsSessionsChannelGridQuerySlug(GASessionsChannelGridAPIQuerySlug);
    })
    .catch(error => {
      console.error("API Call Failed. Error:", error);
    });
};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GASessionsChannelGridAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change


// GASessionsSourcePie API Call Function
const GASessionsSourcePieAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyGASessionsSourcePie = {
    model: modelName,
    view: gaviewName,
    fields: [
      gaSourcemedium,
      sumofSessionsga
    ],
    filters: {
      gaDate: dateFilterString,
      gapropertyId: gaprincessyachtId,
      gaSourcemedium: "google / organic,(direct) / (none),bing / organic,securelogin.hpe.com / referral"
      
      
    },
    vis_config: {
      "type": visGrid,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofSessionsdynamicstringga
  };

  // Functionality to run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyGASessionsSourcePie))
    .then(response => {
      console.log("API Call Successful. Response:", response);
      // Additional logic to handle the response
      // Extract the slug that will be used as a query constant
      const GASessionsSourcePieAPIQuerySlug = response.slug; 
      setGoogleanalyticsSessionsSourcePieQuerySlug(GASessionsSourcePieAPIQuerySlug);
    })
    .catch(error => {
      console.error("API Call Failed. Error:", error);
    });
};

// Trigger the API Call function by using the useEffect hook when the date range changes
useEffect(() => {
  GASessionsSourcePieAPICall();
}, [dateRange]); // Dependency array contains dateRange to trigger re-run on its change


// Function to make the API call for Meta Media Cost Single
const MetaMediaCostSingleAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyMetaMediaCostSingleGrid = {
    model: modelName, // Replace with the actual model name
    view: metaviewName, // Replace with the actual view name
    fields: [
      sumofSpendmeta // Replace with the actual field for Meta Media Cost
    ],
    filters: {
      // Add any filters if needed
      metaDate: dateFilterString, // Replace with the actual date filter variable
      metapropertyId: metaprincessyachtId // Replace with the actual account ID variable if needed
    },
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofSpenddynamicstringmeta // Replace with the actual dynamic field string
  };

  // Run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyMetaMediaCostSingleGrid))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Extract the slug that will be used as a query constant
    const MetaMediaCostSingleAPIQuerySlug = response.slug; 
    setMetaMediaCostSingleQuerySlug(MetaMediaCostSingleAPIQuerySlug); // Replace with the actual function to update state
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function using the useEffect hook when the date range changes
useEffect(() => {
  MetaMediaCostSingleAPICall();
}, [dateRange]); // Re-run on dateRange change

// Function to make the API call for Meta Impressions Single
const MetaImpressionsSingleAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyImpressionsSingle = {
    model: modelName, // Replace with the actual model name
    view: metaviewName, // Replace with the actual view name
    fields: [
      sumofImpressionsfieldmeta // Replace with the actual field for Meta Impressions
    ],
    filters: {
      metaDate: dateFilterString, // Replace with the actual date filter variable
      metapropertyId: metaprincessyachtId // Replace with the actual account ID variable if needed
    },
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofImpressionsdynamicstringmeta // Replace with the actual dynamic field string
  };

  // Run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyImpressionsSingle))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Extract the slug that will be used as a query constant
    const MetaImpressionsSingleAPIQuerySlug = response.slug; 
    setMetaImpressionsSingleQuerySlug(MetaImpressionsSingleAPIQuerySlug); // Replace with the actual function to update state
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function using the useEffect hook when the date range changes
useEffect(() => {
  MetaImpressionsSingleAPICall();
}, [dateRange]); // Re-run on dateRange change

// Function to make the API call for Meta Clicks Single
const MetaClicksSingleAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyMetaClicksSingle = {
    model: modelName, // Replace with the actual model name
    view: metaviewName, // Replace with the actual view name
    fields: [
      sumofClicksfieldmeta // Replace with the actual field for Meta Clicks
    ],
    filters: {
      metaDate: dateFilterString, // Replace with the actual date filter variable
      metapropertyId: metaprincessyachtId // Replace with the actual account ID variable if needed
    },
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofClicksdynamicstringmeta // Replace with the actual dynamic field string
  };

  // Run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyMetaClicksSingle))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Extract the slug that will be used as a query constant
    const MetaClicksSingleAPIQuerySlug = response.slug; 
    setMetaClicksSingleQuerySlug(MetaClicksSingleAPIQuerySlug); // Replace with the actual function to update state
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function using the useEffect hook when the date range changes
useEffect(() => {
  MetaClicksSingleAPICall();
}, [dateRange]); // Re-run on dateRange change

// Function to make the API call for Meta Reach Single
const MetaReachSingleAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyReachSingle = {
    model: modelName, // Replace with the actual model name
    view: metaviewName, // Replace with the actual view name
    fields: [
      sumofReachfieldmeta // Replace with the actual field for Meta Reach
    ],
    filters: {
      metaDate: dateFilterString, // Replace with the actual date filter variable
      metapropertyId: metaprincessyachtId // Replace with the actual account ID variable if needed
    },
    vis_config: {
      "type": visSingle,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: sumofReachdynamicstringmeta // Replace with the actual dynamic field string
  };

  // Run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyReachSingle))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Extract the slug that will be used as a query constant
    const MetaReachSingleAPIQuerySlug = response.slug; 
    setMetaReachSingleQuerySlug(MetaReachSingleAPIQuerySlug); // Replace with the actual function to update state
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function using the useEffect hook when the date range changes
useEffect(() => {
  MetaReachSingleAPICall();
}, [dateRange]); // Re-run on dateRange change


// Function to make the API call for Meta Summary Table
const MetaSummaryTableAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyMetaSummary = {
    model: modelName, // Replace with the actual model name
    view: metaviewName, // Replace with the actual view name
    fields: [
      metaMonth,
      sumofSpendmeta,
      sumofReachfieldmeta,
      sumofClicksfieldmeta,
      sumofImpressionsfieldmeta,
      sumOfPostEngagementmeta,
      sumOfVideoViewsmeta
    ],
    filters: {
      metaDate: dateFilterString, // Replace with the actual date filter variable
      metapropertyId: metaprincessyachtId // Replace with the actual account ID variable if needed
    },
    vis_config: {
      "type": visGrid,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: 
      dynamicFieldsMetaSummary
    
  };

  // Run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyMetaSummary))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Extract the slug that will be used as a query constant
    const MetaSummaryTableAPIQuerySlug = response.slug; 
    setMetaSummaryGridQuerySlug(MetaSummaryTableAPIQuerySlug); // Replace with the actual function to update state
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function using the useEffect hook when the date range changes
useEffect(() => {
  MetaSummaryTableAPICall();
}, [dateRange]); // Re-run on dateRange change


// Function to make the API call for Meta Campaign Summary Table
const MetaCampaignSummaryTableAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyMetaCampaignSummary = {
    model: modelName, // Replace with the actual model name
    view: metaviewName, // Replace with the actual view name
    fields: [
      metaCampaignname,
      sumofSpendmeta,
      sumofReachfieldmeta,
      sumofClicksfieldmeta,
      sumofImpressionsfieldmeta,
      sumOfPostEngagementmeta,
      sumOfVideoViewsmeta
    ],
    filters: {
      metaDate: dateFilterString, // Replace with the actual date filter variable
      metapropertyId: metaprincessyachtId // Replace with the actual account ID variable if needed
    },
    vis_config: {
      "type": visGrid,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: 
      dynamicFieldsMetaSummary
    
  };

  // Run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyMetaCampaignSummary))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Extract the slug that will be used as a query constant
    const MetaCampaignSummaryTableAPIQuerySlug = response.slug; 
    setMetaCampaignSummaryGridQuerySlug(MetaCampaignSummaryTableAPIQuerySlug); // Replace with the actual function to update state
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function using the useEffect hook when the date range changes
useEffect(() => {
  MetaCampaignSummaryTableAPICall();
}, [dateRange]); // Re-run on dateRange change

// Function to make the API call for Meta Ad Summary Table
const MetaAdSummaryTableAPICall = () => {
  // Create the API request body for the query that needs to be run
  const requestBodyMetaAdSummary = {
    model: modelName, // Replace with the actual model name
    view: metaviewName, // Replace with the actual view name
    fields: [
      metaAdname,
      sumofSpendmeta,
      sumofReachfieldmeta,
      sumofClicksfieldmeta,
      sumofImpressionsfieldmeta,
      sumOfPostEngagementmeta,
      sumOfVideoViewsmeta
    ],
    filters: {
      metaDate: dateFilterString, // Replace with the actual date filter variable
      metapropertyId: metaprincessyachtId // Replace with the actual account ID variable if needed
    },
    vis_config: {
      "type": visGrid,
      "x_axis_gridlines": false,
      "y_axis_gridlines": true,
      "y_axis_scale_mode": "linear",
      "show_view_names": false
    },
    dynamic_fields: 
      dynamicFieldsMetaSummary
    
  };

  // Run the API Call
  coreSDK.ok(coreSDK.create_query(requestBodyMetaAdSummary))
  .then(response => {
    console.log("API Call Successful. Response:", response);
    // Extract the slug that will be used as a query constant
    const MetaAdSummaryTableAPIQuerySlug = response.slug; 
    setMetaAdSummaryGridQuerySlug(MetaAdSummaryTableAPIQuerySlug); // Replace with the actual function to update state
  })
  .catch(error => {
    console.error("API Call Failed. Error:", error);
  });
};

// Trigger the API Call function using the useEffect hook when the date range changes
useEffect(() => {
  MetaAdSummaryTableAPICall();
}, [dateRange]); // Re-run on dateRange change



  // Creating the DashboardTabs 

  const DashboardTabs = () => {
    return (
      <>
      {/* Dashboard Header */}
      <Heading fontSize="large" textAlign="center" margin="medium">
        Princess Yachts Dashboard
      </Heading>
      <Space>
      <Heading fontSize="large">Date Range</Heading>
      <div style={{ width: '25%' }}>
        <InputDateRange value={dateRange} onChange={setDateRange} />
      </div>
      </Space>
      <Tabs2>
        <Tab2 id="meta_summary" label="Facebook Summary">
          {/* Content for Google Analytics Summary Dashboard */}
          <SpaceVertical>
            {/* Creating the heading for the tab */}
            <Space style={{display: 'flex', justifyContent: 'center'}}> 
              <Heading fontSize="large" textAlign="center" margin="medium" fontWeight="bold">
                Facebook Summary
              </Heading>
            </Space>

            {/* Container for the top row of cards */}
            <Space style={{display: 'flex', flexDirection: 'column'}}>
              {/* First row of cards */}
              <Space style={{display: 'flex'}}>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Media Cost 
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaMediaCostSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Impressions
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaImpressionsSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Social Clicks
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaClicksSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Sessions
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaClicksSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
              </Space>
            
            <SpaceVertical size = "medium"></SpaceVertical>
            {/* Second row of cards */}
            <Space style={{display: 'flex'}}>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Client Cost 
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaMediaCostSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Reach
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaReachSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    CTR %
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaClicksSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Lead Generations
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={metaClicksSingleQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
              </Space>
            </Space>
            {/* Section for Summary Table */}

            <Space>
            <Card >
                <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                      Facebook Summary Table
                  </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={metaSummaryGridQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                </CardContent>
              </Card>
            </Space>
            <Space>
            <Card >
                <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                      Facebook Campaign Summary Table
                  </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={metaCampaignSummaryGridQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                </CardContent>
              </Card>
            </Space>
            <Space>
            <Card >
                <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                      Facebook Ad Summary Table
                  </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={metaAdSummaryGridQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                </CardContent>
              </Card>
            </Space>
          </SpaceVertical>
        </Tab2>
        <Tab2 id="googleanalytics_summary" label="Google Analytics Summary">

          {/* Content for Google Analytics Summary Dashboard */}

          <SpaceVertical>

            {/* Creating the heading for the tab */}

            <Space style={{display: 'flex', justifyContent: 'center'}}> 
              <Heading fontSize="large" textAlign="center" margin="medium" fontWeight="bold">
                Google Analytics Summary
              </Heading>
            </Space>

            {/* Container for top row of cards */}
            <Space style={{display: 'flex', flexDirection: 'column'}}>
              {/* First row of cards */}
              <Space style={{display: 'flex'}}>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Users 
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={googleanalyticsTotalUsersQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    Sessions
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={googleanalyticsTotalSessionsQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
                <Card style={{width:'300px', height:'150px'}}>
                  <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                    New Users
                    </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                    <DataProvider sdk={coreSDK}>
                      {/* Query to fetch and provide data */}
                      <Query query={googleanalyticsTotalNewUsersQuerySlug}>
                        {/* Visualization to render the chart */}
                        <Visualization />
                      </Query>
                    </DataProvider>
                  </CardContent>
                </Card>
              </Space>
                <SpaceVertical size = "medium"></SpaceVertical>
                {/* Second row of cards */}
                <Space style={{display: 'flex'}}>
                  <Card style={{width:'300px', height:'150px'}}>
                    <CardContent>
                    <Heading  textTransform="capitalize" textAlign="center">
                      Bounce Rate
                      </Heading>
                      <SpaceVertical size = "medium"></SpaceVertical>
                      <Space></Space>
                      {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={googleanalyticsBounceRateQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                    </CardContent>
                  </Card>
                  <Card style={{width:'300px', height:'150px'}}>
                    <CardContent>
                    <Heading  textTransform="capitalize" textAlign="center">
                      Sessions Per User
                      </Heading>
                      <SpaceVertical size = "medium"></SpaceVertical>
                      <Space></Space>
                      {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={googleanalyticsBounceRateQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                    </CardContent>
                  </Card>
                  <Card style={{width:'300px', height:'150px'}}>
                    <CardContent>
                    <Heading  textTransform="capitalize" textAlign="center">
                      Lead Generations
                      </Heading>
                      <SpaceVertical size = "medium"></SpaceVertical>
                      <Space></Space>
                      {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={googleanalyticsBounceRateQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                    </CardContent>
                  </Card>
                </Space>
            </Space>
            {/* Card for Grid     */}
            <Space style={{display: 'flex'}}>
              <Card>
                <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                      Sessions by Channel Grouping
                  </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={googleanalyticsSessionsChannelGridQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                      Sessions by Source / Medium 
                  </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={googleanalyticsSessionsChannelGridQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                </CardContent>
              </Card>
            </Space>
            <Space>
            <Card style={{width:'2000px'}}>
                <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                      Sessions by Date
                  </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={googleanalyticsSessionsLineQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                </CardContent>
              </Card>
            </Space>
            <Space>
            <Card style={{width:'2000px'}}>
                <CardContent>
                  <Heading  textTransform="capitalize" textAlign="center">
                      Users by Date
                  </Heading>
                    <SpaceVertical size = "medium"></SpaceVertical>
                    <Space></Space>
                    {/* DataProvider to provide sdk context */}
                      <DataProvider sdk={coreSDK}>
                        {/* Query to fetch and provide data */}
                        <Query query={googleanalyticsSessionsLineQuerySlug}>
                          {/* Visualization to render the chart */}
                          <Visualization />
                        </Query>
                      </DataProvider>
                </CardContent>
              </Card>
            </Space>
          </SpaceVertical>
        </Tab2>
        <Tab2 id="wow_summary" label="WoW / MoM Summary">
          {/* Content for WoW Summary Dashboard */}
          Performance Summary Data
        </Tab2>
      </Tabs2>
      </>
    );
  };

  return (
    <>
      <ComponentsProvider
        themeCustomizations={{
          colors: { key: '#1A73E8' },
        }}
      >
        {/* Insert the DashboardTabs right here, above existing card */}
        <DashboardTabs />
        
      </ComponentsProvider>
    </>
  )
}
