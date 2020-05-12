import React, { useEffect, useState, useCallback } from 'react';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';
import { FaCircle } from 'react-icons/fa';

import api from '~/services/api';
import history from '~/services/history';
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
  DivSystem,
  TableRow,
  TextTable,
  AddButton,
} from './styles';

function JobControlList() {
  const [jobs, setJobs] = useState([]);
  const [name = '', setName] = useState();
  const [page = 1, setPage] = useState();
  const [loading = 0, setLoading] = useState();

  const loadJobs = useCallback(() => {
    async function load() {
      try {
        setLoading(1);
        const response = await api.get('jobs', {
          params: {
            name,
            page,
          },
        });

        setJobs(response.data.jobs);
        setLoading(0);
      } catch (error) {
        setJobs([]);
        setLoading(0);
        toast.warn(error.response.data.error);
      }
    }
    load();
  }, [page, name]);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  return (
    <Container>
      <Content>
        <h1>Gerenciando encomendas</h1>
        <Options>
          <Form>
            <Input
              name="jobSearch"
              IconInput={MdSearch}
              onChange={(e) => setName(e.target.value)}
              placeholder="Digite o nome do Job"
            />
          </Form>
          <AddButton
            title="CADASTRAR"
            loading={loading}
            IconButton={MdAdd}
            type="button"
            onClick={() => {
              history.push('/jobs/store');
            }}
          />
        </Options>
      </Content>
      <ContentTable>
        {loading ? (
          <Mensagem>
            <h1>Carregando Encomendas...</h1>
          </Mensagem>
        ) : jobs.length <= 0 ? (
          <Mensagem>
            <h1>Não foi encontrado nenhuma encomenda</h1>
          </Mensagem>
        ) : (
          <Table>
            <Header>
              <DivID>
                <strong>ID</strong>
              </DivID>
              <DivName>
                <strong>Nome do Job</strong>
              </DivName>
              <DivSystem>
                <strong>Sistema</strong>
              </DivSystem>
              <DivActions>
                <strong>Opções</strong>
              </DivActions>
            </Header>
            {jobs.map((item) => (
              <TableRow key={item.id}>
                <DivID>
                  <TextTable>#{item.id}</TextTable>
                </DivID>
                <DivName>
                  <TextTable>{item.name}</TextTable>
                </DivName>
                <DivSystem>
                  <div className={`delivery_system ${item.system}`}>
                    <TextTable>
                      <FaCircle size={12} />
                    </TextTable>
                    <TextTable>{item.system}</TextTable>
                  </div>
                </DivSystem>
                <DivActions>
                  <Actions Show={() => ''} Edit={() => ''} Delete={() => ''} />
                </DivActions>
              </TableRow>
            ))}
          </Table>
        )}
      </ContentTable>
      <Pagination page={page} setPage={setPage} list={jobs} />
    </Container>
  );
}

export default JobControlList;
