k6_test

Tools
- GitHub actions - allows scripting workflow to kick off performance test on every code push
- K6 - open source performance testing tool - easy JS API for writing tests, used to execute performance tests and defining and measuring that our performance SLOs are actually fulfilled
    - $brew install k6
- InfluxDB - fast and versatile time-series database built in GO
    - $brew install influxdb
    - $influxd -config /usr/local/etc/influxdb.conf
    - localhost:8086
- Graphana - excellent visualization tool for displaying performance testing data in an easily digestible way (many dashboards, etc. out of the box)
    - $brew install grafana
    - $brew services start grafana
    - localhost:3000 
        - user: admin password: admin
