import React from "react"
import ContentLoader from "react-content-loader"

const TableLoader = props => {
    return (
        <ContentLoader
            width={1200}
            height={400}
            viewBox="0 0 1200 400"
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
            {...props}
        >
            <rect x="27" y="139" rx="4" ry="4" width="20" height="20" />
            <rect x="67" y="140" rx="10" ry="10" width="85" height="19" />
            <rect x="188" y="141" rx="10" ry="10" width="169" height="19" />
            <rect x="402" y="140" rx="10" ry="10" width="85" height="19" />
            <rect x="523" y="141" rx="10" ry="10" width="169" height="19" />
            <rect x="731" y="139" rx="10" ry="10" width="85" height="19" />
            <rect x="852" y="138" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="196" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="197" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="198" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="197" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="198" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="196" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="195" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="258" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="259" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="260" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="259" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="260" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="258" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="257" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="316" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="317" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="318" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="317" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="318" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="316" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="315" rx="10" ry="10" width="85" height="19" />

            <rect x="26" y="379" rx="4" ry="4" width="20" height="20" />
            <rect x="66" y="380" rx="10" ry="10" width="85" height="19" />
            <rect x="187" y="381" rx="10" ry="10" width="169" height="19" />
            <rect x="401" y="380" rx="10" ry="10" width="85" height="19" />
            <rect x="522" y="381" rx="10" ry="10" width="169" height="19" />
            <rect x="730" y="379" rx="10" ry="10" width="85" height="19" />
            <rect x="851" y="378" rx="10" ry="10" width="85" height="19" />

            <rect x="978" y="138" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="195" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="257" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="315" rx="10" ry="10" width="169" height="19" />
            <rect x="977" y="378" rx="10" ry="10" width="169" height="19" />

            <circle cx="37" cy="97" r="11" />
            <rect x="26" y="23" rx="5" ry="5" width="153" height="30" />
            <circle cx="77" cy="96" r="11" />
        </ContentLoader>
    )
}

TableLoader.metadata = {
    name: 'Shaheer Ali',
    github: 'itsmeshaheerali',
    description: 'This loader exactly fit inside your bootrstrap card component no override happens like existing DataTable Loader',
    filename: 'BootstrapCardDataTable'
}

export default TableLoader
