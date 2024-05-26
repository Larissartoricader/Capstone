
import { useRouter } from "next/router";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import {StyledNav, StyledLink, StyledIcon, StyledHomeIcon, StyledHeartIcon, MenuTitle, MenuIconTitleBox} from './NavigationBar.styles';

export default function NavigationBar() {
  const router = useRouter();

  const { data: session } = useSession();

  const isActive = (path) => {
    return router.pathname === path;
  };

  return (
    <StyledNav>
      <StyledLink onClick={() => router.push("/")} active={isActive("/")}>
        <MenuIconTitleBox>
          <StyledHomeIcon />
          <MenuTitle>HOME</MenuTitle>
        </MenuIconTitleBox>
      </StyledLink>
      {session && (
        <StyledLink
          onClick={() => router.push("/create")}
          active={isActive("/create")}
        >
          <StyledIcon icon={faPlus} />
        </StyledLink>
      )}
      <StyledLink
        onClick={() => router.push("/bookmarks")}
        active={isActive("/bookmarks")}
      >
        <MenuIconTitleBox>
          <StyledHeartIcon />
          <MenuTitle>FAVORITES</MenuTitle>
        </MenuIconTitleBox>
      </StyledLink>
    </StyledNav>
  );
}
