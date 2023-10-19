import Main from "@/components/Main";
import { AuthProvider, useAuth } from "@/utils/AuthContext";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import { headers } from 'next/headers'

export default function Home() {

  const headersList = headers()
  const userAgent = headersList.get('user-agent')
  const isMobile = userAgent?.includes('iPhone') || userAgent?.includes('Android') || userAgent?.includes('iPad') || false

  return (
    <AuthProvider>
      <ChakraProvider>
        <Main isMobile={isMobile} />
      </ChakraProvider>
    </AuthProvider>
  );
}
