import React, { useState } from "react";
import { styled } from "styled-components";
import Navbar from "../Components/Navbar";
import { Button, Menu } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
} from "@ant-design/icons";

const AdminWrapper = styled.div``;

const Main = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 10px;
  max-width: 95%;
  margin: 0px auto;
`;

const Sidebar = styled.div`
  height: 90vh;
  margin-top: 10px;
`;

const Aside = styled.div`
  width: 100%;
  height: 92vh;
  color: #fff;
  overflow-y: auto;
  background: #33323fcc;
  padding: 15px;
`;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const menus = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("Option 3", "3", <ContainerOutlined />),
  getItem("Navigation One", "sub1", <MailOutlined />, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Option 7", "7"),
    getItem("Option 8", "8"),
  ]),
  getItem("Navigation Two", "sub2", <AppstoreOutlined />, [
    getItem("Option 9", "9"),
    getItem("Option 10", "10"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 11", "11"),
      getItem("Option 12", "12"),
    ]),
  ]),
];

const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };
  return (
    <AdminWrapper>
      <div
        style={{
          backgroundImage: 'url("/login-image.png")',
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "",
          height: "100vh",
          overflowY: "hidden",
          width: "100%",
        }}
      >
        <Navbar />
        <Main>
          <Sidebar>
            <Button
              type="primary"
              onClick={toggleCollapsed}
              style={{
                marginBottom: 16,
                background: "#4c52ff",
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
            <Menu
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              mode="inline"
              theme="dark"
              inlineCollapsed={collapsed}
              items={menus}
            />
          </Sidebar>
          <Aside>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi,
            odit neque modi perspiciatis hic atque enim deleniti velit rem
            veniam, quo rerum officiis similique quas consectetur et officia
            obcaecati sequi! Voluptate laborum voluptatem similique ea! Ullam,
            sunt animi debitis rerum illum cum sed necessitatibus rem dolorem
            repellat omnis facilis. Perferendis natus officiis vero cum fuga
            repellendus accusamus dolore, fugit perspiciatis. Quia, maiores
            atque eum, voluptatum corrupti saepe provident quos maxime
            aspernatur pariatur modi dolorem! Maiores error amet iusto
            quibusdam, saepe quidem assumenda itaque expedita ad asperiores
            veritatis veniam mollitia enim? Velit ipsum minus sed, soluta nam
            quasi quas, magni consequuntur temporibus omnis nobis debitis
            similique voluptatem. Quas obcaecati pariatur quaerat sunt alias sed
            sint! Earum fugit sapiente iusto esse provident? Commodi quam culpa
            laboriosam alias quia reiciendis nemo fuga iure doloribus
            consequuntur. Voluptates asperiores qui neque reiciendis explicabo,
            sed culpa commodi molestias officia, dolorem facilis praesentium
            sequi in labore? Saepe. Magni nostrum voluptas nemo, id architecto
            ipsum, ea numquam temporibus tempora beatae quo? Omnis voluptas ut
            tempore facilis deserunt odit, sed a? Minus molestiae natus odit?
            Obcaecati vel sapiente error! Suscipit dolor quas doloremque at
            voluptas aliquid reprehenderit explicabo in, optio aliquam esse modi
            laudantium nobis laborum atque quam non autem delectus! Blanditiis
            consequatur quod impedit repellendus deserunt, magni eius? Incidunt
            ut dolore placeat reprehenderit pariatur voluptatem iste vitae quo
            similique laborum! Accusamus nam, doloremque, nostrum est
            exercitationem, laudantium reprehenderit ipsa omnis saepe harum
            perferendis laboriosam perspiciatis. Error, omnis fugit! Suscipit
            molestiae eligendi explicabo fugiat, temporibus nam veritatis cumque
            hic beatae nihil quos at similique! Reiciendis voluptates, possimus
            consectetur illum porro ullam quia, iste ad atque maxime ipsum
            repellat quod! Magnam veritatis facilis iure pariatur optio eveniet
            repellat provident architecto aut perspiciatis quisquam quae dolores
            incidunt, alias eos ea soluta, porro nesciunt omnis consequuntur
            deleniti id odio officiis! Exercitationem, quisquam? Libero
            reiciendis, quos quo non quas amet ea voluptate repellat eligendi
            dicta? Placeat magnam voluptate unde cupiditate? Asperiores
            reprehenderit error exercitationem eaque repellendus, provident
            dicta cupiditate fugiat quaerat veritatis quia. Odio culpa cumque
            modi veritatis aperiam ipsam minima perspiciatis voluptatum quia
            soluta vitae quam, ab magnam aut praesentium eligendi enim debitis.
            Quis adipisci velit aperiam delectus ipsam nam nemo tempore? Minima
            perferendis necessitatibus eius consectetur asperiores, placeat
            ullam, facilis dicta laborum libero saepe consequatur ea eaque
            voluptate repellendus temporibus odit deserunt veniam quis. Debitis
            nam amet, nostrum exercitationem eaque perspiciatis. Dicta aperiam
            consequatur, exercitationem officiis laboriosam itaque quas. Eos
            fuga voluptate ex delectus saepe neque iusto, numquam deleniti nobis
            iste ab illo? Nisi, debitis. Nam veniam odit placeat accusamus
            tempora. Illum nulla ipsum libero cum tempore voluptates dolore
            minima aliquid, fugit nihil accusamus? Quis fuga quia rerum
            blanditiis quam reiciendis voluptate obcaecati reprehenderit. Illo,
            iusto veritatis et dolorum iste voluptates. Modi explicabo excepturi
            possimus asperiores pariatur rerum, veritatis exercitationem maxime
            natus autem quos quisquam ullam fuga voluptatem, hic vel! Magnam
            aperiam eum necessitatibus deserunt. Quo hic explicabo pariatur
            tempora suscipit? Veniam, ullam quibusdam numquam sit sunt
            architecto, excepturi vero officia tempora facere beatae laborum
            dolorem recusandae! Illo itaque quis nihil, ipsam molestias sapiente
            suscipit mollitia earum dolor est iusto atque! Unde vero ipsam
            molestiae id iusto, in nihil eveniet voluptatem cupiditate
            similique. Aperiam nesciunt dicta aut ipsum, provident porro
            delectus quas necessitatibus? Incidunt iusto asperiores culpa rerum!
            Saepe, architecto quia. Doloribus et recusandae reiciendis, voluptas
            consequatur fuga aperiam repudiandae animi laborum cumque obcaecati
            fugit, soluta unde minus libero debitis sed porro nisi cupiditate!
            Nobis deleniti placeat officiis corrupti eos qui! Architecto minima
            iste officiis et odio, reprehenderit eius repellendus dolor!
            Similique cumque illo numquam quasi nulla iure nemo tempora ad
            cupiditate necessitatibus, accusamus voluptatum, ut dolore rem porro
            exercitationem optio. Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Inventore, delectus pariatur. Ipsam, asperiores
            cupiditate repellendus inventore quasi fugiat aspernatur sed id hic
            distinctio voluptate aut ipsa soluta odit laborum. Delectus!
            Voluptate ipsam iusto alias fuga in optio incidunt facere sunt,
            saepe eos, quam ullam, harum a itaque voluptas distinctio magnam
            sequi voluptatum quae adipisci error deserunt tempore veniam? Iste,
            quibusdam! Ipsum dolore hic labore soluta modi, quam quae nemo
            cupiditate tempore commodi, perspiciatis asperiores deleniti. Eum
            veritatis quisquam, libero ipsum mollitia velit molestias doloribus
            odio possimus qui inventore optio corporis. Voluptates alias
            dignissimos nobis obcaecati consequuntur provident. Dolor quisquam
            aperiam quo porro minus possimus aliquam alias dolores, sunt
            consectetur! Molestias natus ipsa sint et totam adipisci est
            repellendus, maiores nisi. Ipsam maxime voluptate tempora inventore
            consectetur vero pariatur labore hic tempore. Odio non ratione odit,
            corrupti rerum voluptatum quos. Nulla quod atque consequatur nemo
            vel aut delectus soluta illo blanditiis.
          </Aside>
        </Main>
      </div>
    </AdminWrapper>
  );
};

export default AdminPage;
