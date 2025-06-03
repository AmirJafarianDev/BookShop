
function ProfilePage() {
  const fullName=localStorage.getItem("fullName")
  return (
    <div className="w-full ">
      <h2 className="text-2xl font-bold mr-4 w-[100%]">سلام {fullName} عزیز به پنل کاربری خودت خوش آمدی!</h2>
    </div>
  )
}

export default ProfilePage