/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['oaidalleapiprodscus.blob.core.windows.net', 'dmbkhireuarjpvecjmds.supabase.co', 'jmgowbnhsejplwjfhpnv.supabase.co'],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: '4mb' // Set desired value here
        }
    }
};

module.exports = nextConfig;
