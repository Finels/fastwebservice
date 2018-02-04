package org.fast.service.sys.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.apache.commons.dbcp2.BasicDataSourceFactory;
import org.springframework.beans.factory.config.BeanPostProcessor;
import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.core.env.Environment;
import org.springframework.core.io.Resource;
import org.springframework.dao.annotation.PersistenceExceptionTranslationPostProcessor;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.JpaVendorAdapter;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.support.PersistenceAnnotationBeanPostProcessor;
import org.springframework.orm.jpa.vendor.Database;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.io.IOException;
import java.util.Properties;

/**
 * Description:  spring上下文配置类
 * Copyright: © 2017 CSNT. All rights reserved.
 * Company: CSNT
 *
 * @author 付尧
 * @version 1.0
 * @timestamp 2017/9/20
 */
@SuppressWarnings("Duplicates")
@Configuration
@EnableTransactionManagement //启用事务注解扫描器
@EnableAspectJAutoProxy
@ComponentScan(basePackages = "org.fast.service")
@PropertySource({"WEB-INF/classes/dbcp.properties", "WEB-INF/classes/mongo.properties", "WEB-INF/classes/system-config.properties", "WEB-INF/classes/redis.properties"})
public class ApplicationContextConfig {


    /**
     * 配置properties
     */
    @Bean
    public PropertySourcesPlaceholderConfigurer setProperties(SpringContextUtil contextUtil) throws IOException {
        PropertySourcesPlaceholderConfigurer placeholderConfigurer = new PropertySourcesPlaceholderConfigurer();
        Resource r = contextUtil.getApplicationContext().getResource("WEB-INF/classes/dbcp.properties");
        Resource mongoConfig = contextUtil.getApplicationContext().getResource("WEB-INF/classes/mongo.properties");
        placeholderConfigurer.setLocations(new Resource[]{r, mongoConfig});
        return placeholderConfigurer;
    }


    /**
     * mysql数据源
     *
     * @param env
     * @return
     */
    @Bean
    public DataSource dataSource(Environment env, SpringContextUtil contextUtil) throws Exception {
        Properties database = new Properties();
        database.load(contextUtil.getApplicationContext().getResource("WEB-INF/classes/dbcp.properties").getInputStream());
        BasicDataSource dataSource = BasicDataSourceFactory.createDataSource(database);
        return dataSource;
    }

    @Bean
    public JpaVendorAdapter jpaVendorAdapter() {
        HibernateJpaVendorAdapter adapter = new HibernateJpaVendorAdapter();
        adapter.setDatabase(Database.MYSQL);
        adapter.setShowSql(true);
        adapter.setDatabasePlatform("org.hibernate.dialect.MySQLDialect");
        return adapter;
    }

    /**
     * spring-data-jpa相关配置实现类
     * <p>
     * 如果声明bean时不指定name，那么方法名会默认映射为bean-name，而EntityManagerFactory类默认的bean-name刚好为entityManagerFactory
     */
    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean setEntityManagerFactory(DataSource datasource, JpaVendorAdapter jpaVendorAdapter) {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean = new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setPackagesToScan(new String[]{"org.fast.service.domain", "org.fast.service.dao"});
        entityManagerFactoryBean.setDataSource(datasource);
        entityManagerFactoryBean.setJpaVendorAdapter(jpaVendorAdapter);
        return entityManagerFactoryBean;
    }

    @Bean
    public BeanPostProcessor persistenceTranslation() {
        return new PersistenceExceptionTranslationPostProcessor();
    }

    @Bean
    public PersistenceAnnotationBeanPostProcessor postProcessor() {
        return new PersistenceAnnotationBeanPostProcessor();
    }


    /**
     * 配置事务管理，
     * 使用spring的DatasourceTM
     *
     * @return
     */
    @Bean
    public JpaTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
        return transactionManager;
    }


//    /**
//     * 配置事务管理，
//     * 使用spring的DatasourceTM
//     *
//     * @return
//     */
//    @Bean
//    public DataSourceTransactionManager transactionManager(@Qualifier("dataSourceJpa") DataSource dataSource) {
//        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
//        transactionManager.setDataSource(dataSource);
//        return transactionManager;
//    }
}
