import { useState } from "react";
import * as authApi from "@/utils/backend/api/auth";
import { PageContainer, Heading } from "@/components";

const ProfilePage = () => {
  return (
    <PageContainer>
      <Heading title="Profile"/>
    </PageContainer>
  );
}

export default ProfilePage;