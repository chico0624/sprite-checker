import { Link } from "react-router-dom"
import styled from "styled-components"


const LinkDiv = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid #e9ecef;
    border-radius: 7px;
    padding: 15px;
    box-shadow: 10px 5px 5px #ced4da;
    transition: all .2s;
    @media screen and (min-width: 768px){
        padding: 40px;    
    }
    img {
        width: 50px;
        height: 50px;
    }
    & > div {
        &:nth-of-type(1) {
            width: 100px;
        }
        &:nth-of-type(2) {
            width: calc(100% - 100px);
        }
    }
    a {
        font-size: 1.2em;
    }
    &:hover {
        transform: translateY(5px);
        box-shadow: none;
    }
`

const TitleP = styled.p`
    font-size: 1.2em;    
`

const DescriptionP = styled.p`
    color:#ced4da;
    margin-top: 10px;
    font-size: 0.85em;
`

type PropsType = {
    to: string
    title: string
    description: string
    icon?: string
}

const LinkCard: React.FC<PropsType> = ({ to, title, description, icon }) => {
    return (
        <Link to={to}>
            <LinkDiv>
                <div>
                    <img src={icon} alt={title}></img>
                </div>
                <div>
                    <TitleP>{title}</TitleP>
                    <DescriptionP>{description}</DescriptionP>
                </div>
            </LinkDiv>
        </Link>
    )
}

export default LinkCard