package com.example.QuerySystem.service;

import com.example.QuerySystem.entity.Query;
import com.example.QuerySystem.repository.QueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class QueryService {

    @Autowired
    private QueryRepository queryRepository;

    @Autowired
    private EmailService emailService;

    // ===============================
    // SUBMIT QUERY
    // ===============================
    public Map<String, String> submitQuery(Map<String, String> payload) {

        Query query = new Query();

        String queryId = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"))
                + (int) (Math.random() * 90 + 10);

        query.setQueryId(queryId);
        query.setUserId(payload.get("userId"));
        query.setCategory(payload.get("category"));
        query.setPriority(payload.get("priority"));
        query.setOriginalQuery(payload.get("queryText"));
        query.setStatus("NEW");
        query.setAnswered(false);
        query.setRead(false);
        query.setCreatedAt(LocalDateTime.now());

        queryRepository.save(query);

        // notify admin
        emailService.sendAdminNotification(query);

        return Map.of(
                "message", "Query submitted successfully",
                "queryId", queryId
        );
    }

    // ===============================
    // USER: VIEW OWN QUERIES
    // ===============================
    public List<Query> getUserQueries(String userId) {

        List<Query> queries = queryRepository.findByUserId(userId);

        for (Query q : queries) {
            q.setRead(true);
        }

        queryRepository.saveAll(queries);
        return queries;
    }
}
