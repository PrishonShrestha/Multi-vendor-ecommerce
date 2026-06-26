import { prisma } from "@/lib/db";

const authSeller = async (request) => {
  try {
    const user = prisma.user.findUnique({
      where: { id: userId },
      include: { store: true },
    });

    if (user.store) {
      if (user.store.status === "approved") {
        return user.store.id;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default authSeller;
