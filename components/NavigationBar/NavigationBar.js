
import { useRouter } from "next/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import {StyledLinkHeartAndHome, StyledNav, StyledLink, StyledIcon, EmptyHomeIcon, FilledHomeIcon, EmptyHeartIcon, FilledHeartIcon, MenuTitle, MenuIconTitleBox} from './NavigationBar.styles';

export default function NavigationBar() {
  const router = useRouter();
  const { pathname } = router;

  const { data: session } = useSession();

  const isActive = (path) => {
    return router.pathname === path;
  };


  return (
    <StyledNav>
      <StyledLinkHeartAndHome onClick={() => router.push("/")} active={isActive("/")}>
        <MenuIconTitleBox>
          {pathname === "/" ? <FilledHomeIcon /> : <EmptyHomeIcon/>}
          <MenuTitle>HOME</MenuTitle>
        </MenuIconTitleBox>
      </StyledLinkHeartAndHome>
      {session && (
        <StyledLink
          onClick={() => router.push("/create")}
          active={isActive("/create")}
        >
        <StyledIcon icon={faPlus}/>
        </StyledLink>
      )}
      <StyledLinkHeartAndHome
        onClick={() => router.push("/bookmarks")}
        active={isActive("/bookmarks")}
      >
        <MenuIconTitleBox>
        {pathname === "/bookmarks" ? <FilledHeartIcon /> : <EmptyHeartIcon/>}
          <MenuTitle>FAVORITES</MenuTitle>
        </MenuIconTitleBox>
      </StyledLinkHeartAndHome>
    </StyledNav>
  );
}
