import { useState, useContext } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { PageContext } from "../../contexts/page/PageContext";
import styled from "styled-components";
import {
  Table,
  THead,
  TBody,
  TFoot,
  TR,
  TH,
  TD,
} from "../../components/ui/Table";
import RoomsSettings from "./RoomsSettings";
import AddEntity from "../../components/ui/AddEntity";
import RoomsForm from "./RoomsForm";
import Pagination from "../../components/ui/Pagination";
import narrowData from "../../utils/narrowData";
import { RoomsTable as TypedRoomsTable } from "../../types";

const roomsSortFunctions = {
  "created_at-asc": (a: TypedRoomsTable, b: TypedRoomsTable) =>
    Date.parse(a.created_at) - Date.parse(b.created_at),
  "created_at-desc": (a: TypedRoomsTable, b: TypedRoomsTable) =>
    Date.parse(b.created_at) - Date.parse(a.created_at),
  "price-asc": (a: TypedRoomsTable, b: TypedRoomsTable) => a.price - b.price,
  "price-desc": (a: TypedRoomsTable, b: TypedRoomsTable) => b.price - a.price,
};

const RoomImg = styled.img`
  border-radius: 1rem;
  height: 8rem;
  width: 100%;
  min-width: 6rem;
  object-fit: cover;
`;

function RoomsTable() {
  const [activeSettingsId, setActiveSettingsId] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const initialRoomsData = useContext(PageContext) as TypedRoomsTable[];

  const sortParams =
    (searchParams.get("sort") as keyof typeof roomsSortFunctions) ||
    "created_at-desc";
  const sortFn = roomsSortFunctions[sortParams];

  const currentPage = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;

  const [narrowedRooms] = narrowData(
    initialRoomsData,
    null,
    sortFn,
    currentPage
  );

  if (!narrowedRooms.length)
    return (
      <Navigate
        to={{
          search: searchParams
            .toString()
            .replace(`page=${currentPage}`, `page=${currentPage - 1}`),
        }}
      />
    );

  return (
    <>
      <Table>
        <THead>
          <TR>
            <TH $width="20%">Фото</TH>
            <TH $width="20%">Тип номера</TH>
            <TH $width="40%">Описание</TH>
            <TH $width="10%">Цена</TH>
            <TH $width="10%">Настройки</TH>
          </TR>
        </THead>

        <TBody>
          {narrowedRooms!.map((room) => (
            <TR key={room.id}>
              <TD>
                <RoomImg
                  src={(room.src as string) || "photo_placeholder.jpg"}
                  alt={room.name}
                  width={465}
                  height={265}
                />
              </TD>
              <TD>{room.name}</TD>
              <TD>{room.description}</TD>
              <TD>{room.price} р/сут</TD>
              <TD>
                <RoomsSettings
                  settingsAreOpened={activeSettingsId === room.id}
                  setActiveSettingsId={setActiveSettingsId}
                  roomData={room}
                />
              </TD>
            </TR>
          ))}
        </TBody>

        <TFoot>
          <Pagination
            totalDataCount={initialRoomsData.length}
            currentDataCount={narrowedRooms.length}
            columns={5}
          />
        </TFoot>
      </Table>

      <AddEntity Entity={RoomsForm} />
    </>
  );
}

export default RoomsTable;
