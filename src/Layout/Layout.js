import { useState, useEffect } from "react";
import { getData } from "../Data/getData";
import { NavigationBar } from "../Component/NavigationBar/NavigationBar"
import { Folder } from "../Component/Folder/Folder";
import { Footer } from "../Component/Footer/Footer";
import { SearchBar } from "../Component/SearchBar/SearchBar";

export const Layout = () => {
  const [profile, setProfile] = useState(null);
  const [folder, setFolder] = useState(null);
  
  useEffect(() => {
    getData('user').then(setProfile);
    getData("folder")
      .then((response) => {
        const { folder } = response;
        return folder;
      })
      .then(setFolder);
  }, []);
  
  //folder 부분 데이터 오류 날때가 있음 ...
  return (
    <div>
      <NavigationBar profile={profile} />
      <div className="Page">
        {folder? <Folder folder={folder} /> : null}
        <div className="Page-item">
          <SearchBar />
        </div>
      </div>
      <Footer />
    </div>
  );
};
