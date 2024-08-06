/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:"https",
                hostname:"www.unleashedsoftware.com"
            }
        ]
    }
};

export default nextConfig;
