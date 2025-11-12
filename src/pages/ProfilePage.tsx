import { useState } from "react";
import * as authApi from "@/utils/backend/api/auth";
import { PageContainer, Heading } from "@/components";

const ProfilePage = () => {
  return (
    <PageContainer>
      <div className="my-5 px-5">
        <Heading title="Profile" />
      </div>
      {/* Update email  */}
      {/* Update password */}
      {/* Edit favorites */}
    </PageContainer>
  );
}

export default ProfilePage;