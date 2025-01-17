import { useAccount } from "wagmi";
import { CheckBadgeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";

const AccountInfo = () => {
  const accountState = useAccount();

  const { data: userContractAddressData } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "yourContractAddress",
    args: [accountState.address],
  });

  const { data: userAllowlistData } = useScaffoldContractRead({
    contractName: "BatchRegistry",
    functionName: "allowList",
    args: [accountState.address],
  });

  if (!accountState.address) {
    return null;
  }

  return (
    <>
      <div className="py-2 px-5 ml-4 rounded-2xl text-sm font-semibold bg-[#DAE8FF]">
        <div>
          <div className="flex flex-row content-center">
            AllowListed{" "}
            {userAllowlistData ? (
              <CheckBadgeIcon className="ml-1" color="green" width={20} />
            ) : (
              <XMarkIcon className="ml-1" color="red" width={20} />
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-row content-center">
            Checked in{" "}
            {userContractAddressData != "0x0000000000000000000000000000000000000000" ? (
              <CheckBadgeIcon className="ml-1" color="green" width={20} />
            ) : (
              <XMarkIcon className="ml-1" color="red" width={20} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInfo;
