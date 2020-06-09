import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdClear } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';

import { signOut } from '~/store/modules/auth/actions';
import api from '~/services/api';
import History from '~/services/history';
import Pagination from '~/components/Pagination';
import Input from '~/components/SimpleInput';
import Actions from '~/components/MenuActions';

import {
  Container,
  Content,
  Options,
  ContentTable,
  Table,
  Mensagem,
  Header,
  DivID,
  DivName,
  DivActions,
  TableRow,
  TextTable,
  AddButton,
  ClearButton,
} from './styles';

function HistoryList() {
  const [history, setHistory] = useState([]);
  const [query_name = '', setQueryName] = useState();
  const [page = 1, setPage] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const treatmentError = useCallback(
    (error) => {
      function treatment() {
        if (error.response) {
          const { status } = error.response;
          if (status === 401) {
            dispatch(signOut());
          } else if (error.response.data) {
            toast.error(error.response.data.error);
          }
        } else {
          toast.error('Erro inesperado do sistema!');
        }
      }
      treatment();
    },
    [dispatch]
  );

  const loadHistory = useCallback(() => {
    async function load() {
      try {
        setLoading(true);
        const response = await api.get('history', {
          params: {
            query_name,
            page,
          },
        });

        setHistory(response.data);
        setLoading(false);
      } catch (error) {
        loadHistory([]);
        setLoading(false);
        treatmentError(error);
      }
    }
    load();
  }, [page, query_name, treatmentError]);

  useEffect(() => {
    loadHistory();
  }, [loadHistory]);

  async function handleDelete(historyDelete) {
    try {
      await api.delete(`history/${historyDelete.id}`);
      toast.success('História excluida com sucesso!');
      loadHistory();
    } catch (error) {
      treatmentError(error);
    }
  }

  function confirmDelete(historyDelete) {
    confirmAlert({
      title: 'Exclusão',
      message: 'Deseja excluir a história?',
      buttons: [
        {
          label: 'Excluir',
          onClick: () => {
            handleDelete(historyDelete);
          },
        },
        {
          label: 'Cancelar',
          onClick: () => toast.warn('Exclusão Cancelada!'),
        },
      ],
    });
  }

  return (
    <Container>
      <Content>
        <h1>Gerenciando Histórias</h1>
        <Options>
          <Form>
            <Input
              name="history_search"
              IconInput={MdSearch}
              onChange={(e) => setQueryName(e.target.value)}
              placeholder="Digite o nome da história"
              value={query_name}
            />
            <ClearButton
              name="clearSearch"
              type="button"
              IconButton={MdClear}
              onClick={() => setQueryName('')}
            />
          </Form>
          <AddButton
            title="CADASTRAR"
            loading={loading}
            IconButton={MdAdd}
            type="button"
            onClick={() => {
              History.push('/history/store');
            }}
          />
        </Options>
      </Content>
      <ContentTable>
        <Table>
          <Header>
            <DivID>
              <strong>ID</strong>
            </DivID>
            <DivName>
              <strong>História</strong>
            </DivName>
            <DivActions>
              <strong>Opções</strong>
            </DivActions>
          </Header>
        </Table>
      </ContentTable>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Histórias...</h1>
          </Mensagem>
        ) : history.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhuma história</h1>
          </Mensagem>
        ) : (
          <Table>
            {history.map((item) => (
              <TableRow key={item.id}>
                <DivID>
                  <TextTable>#{item.id}</TextTable>
                </DivID>
                <DivName>
                  <TextTable>{item.name}</TextTable>
                </DivName>
                <DivActions>
                  <Actions
                    Edit={() => History.push(`/history/update/${item.id}`)}
                    Delete={() => confirmDelete(item)}
                  />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={history} />
    </Container>
  );
}

export default HistoryList;
